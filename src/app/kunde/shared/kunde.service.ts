/* eslint-disable max-lines */
/* eslint-disable */

import { BASE_URI, KUNDEN_PATH_REST } from '../../shared';
import { Kunde, KundeGeschlecht, KundeServer, Familienstand } from './kunde';
// Bereitgestellt durch HttpClientModule
// HttpClientModule enthaelt nur Services, keine Komponenten
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { DiagrammService } from '../../shared/diagramm.service';
import { Injectable } from '@angular/core';
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts
import { Subject } from 'rxjs';

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modul oder einer Komponente bereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.

/**
 * Die Service-Klasse zu B&uuml;cher wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class KundeService {
    // Observables = Event-Streaming mit Promises
    // Subject statt Basisklasse Observable:
    // in find() und findById() wird next() aufgerufen
    /* eslint-disable no-underscore-dangle */
    readonly kundenSubject = new Subject<Array<Kunde>>();
    readonly kundeSubject = new Subject<Kunde>();
    readonly errorSubject = new Subject<string | number>();

    private readonly baseUriKunden!: string;

    private _kunde!: Kunde;

    /**
     * @param diagrammService injizierter DiagrammService
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(
        private readonly diagrammService: DiagrammService,
        private readonly httpClient: HttpClient,
    ) {
        this.baseUriKunden = `${BASE_URI}/${KUNDEN_PATH_REST}`;
        console.log(
            `KundeService.constructor(): baseUriKunde=${this.baseUriKunden}`,
        );
    }

    /**
     * Ein Kunde-Objekt puffern.
     * @param kunde Das Kunde-Objekt, das gepuffert wird.
     * @return void
     */
    set kunde(kunde: Kunde) {
        console.log('KundeService.set kunde()', kunde);
        this._kunde = kunde;
    }

    /**
     * Kunden suchen
     * @param suchkriterien Die Suchkriterien
     */
    find(suchkriterien: Suchkriterien) {
        console.log('KundeService.find(): suchkriterien=', suchkriterien);
        const params = this.suchkriterienToHttpParams(suchkriterien);
        const uri = this.baseUriKunden;
        console.log(`KundeService.find(): uri=${uri}`);

        const errorFn = (err: HttpErrorResponse) => {
            if (err.error instanceof ProgressEvent) {
                console.error('Client-seitiger oder Netzwerkfehler', err.error);
                this.errorSubject.next(-1);
                return;
            }

            const { status } = err;
            console.log(
                `KundeService.find(): errorFn(): status=${status}, ` +
                    'Response-Body=',
                err.error,
            );
            this.errorSubject.next(status);
        };

        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request abbrechen ("cancel") kann
        // https://angular.io/guide/http
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        return this.httpClient
            .get<Array<KundeServer>>(uri, { params })
            .pipe(
                // Pipeable operators
                // http://reactivex.io/documentation/operators.html
                map(jsonArray =>
                    jsonArray.map(jsonObjekt => Kunde.fromServer(jsonObjekt)),
                ),
            )
            .subscribe(kunden => this.kundenSubject.next(kunden), errorFn);

        // Same-Origin-Policy verhindert Ajax-Datenabfragen an einen Server in
        // einer anderen Domain. JSONP (= JSON mit Padding) ermoeglicht die
        // Uebertragung von JSON-Daten ueber Domaingrenzen.
        // In Angular gibt es dafuer den Service Jsonp.
    }

    /**
     * Ein Kunde anhand der ID suchen
     * @param id Die ID des gesuchten Kundes
     */
    // eslint-disable-next-line max-lines-per-function
    findById(id: string | undefined) {
        console.log(`KundeService.findById(): id=${id}`);

        // Gibt es ein gepuffertes Kunde mit der gesuchten ID und Versionsnr.?
        if (
            this._kunde !== undefined &&
            this._kunde._id === id &&
            this._kunde.version !== undefined
        ) {
            console.log(
                `KundeService.findById(): Kunde gepuffert, version=${this._kunde.version}`,
            );
            this.kundeSubject.next(this._kunde);
            return;
        }
        if (id === undefined) {
            console.log('KundeService.findById(): Keine Id');
            return;
        }

        // Ggf wegen fehlender Versionsnummer (im ETag) nachladen
        const uri = `${this.baseUriKunden}/${id}`;

        const errorFn = (err: HttpErrorResponse) => {
            if (err.error instanceof ProgressEvent) {
                console.error(
                    'KundeService.findById(): errorFn(): Client- oder Netzwerkfehler',
                    err.error,
                );
                this.errorSubject.next(-1);
                return;
            }

            const { status } = err;
            console.log(
                `KundeService.findById(): errorFn(): status=${status}` +
                    `Response-Body=${err.error}`,
            );
            this.errorSubject.next(status);
        };

        console.log('KundeService.findById(): GET-Request');

        let body: KundeServer | null = null;
        let etag: string | null = null;
        return this.httpClient
            .get<KundeServer>(uri, { observe: 'response' })
            .pipe(
                filter(response => {
                    console.debug(
                        'KundeService.findById(): filter(): response=',
                        response,
                    );
                    ({ body } = response);
                    return body !== null;
                }),
                filter(response => {
                    etag = response.headers.get('ETag');
                    console.log(`etag = ${etag}`);
                    return etag !== null;
                }),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                map(_ => {
                    this._kunde = Kunde.fromServer(body, etag);
                    return this._kunde;
                }),
            )
            .subscribe(kunde => this.kundeSubject.next(kunde), errorFn);
    }

    /**
     * Ein neues Kunde anlegen
     * @param neuesKunde Das JSON-Objekt mit dem neuen Kunde
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    save(
        kunde: Kunde,
        successFn: (location: string | undefined) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorFn: (status: number, errors: { [s: string]: any }) => void,
    ) {
        console.log('KundeService.save(): kunde=', kunde);
        //kunde.geburtsdatum = new Date();

        const errorFnPost = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'KundeService.save(): errorFnPost(): Client- oder Netzwerkfehler',
                    err.error.message,
                );
            } else if (errorFn === undefined) {
                console.error('errorFnPost', err);
            } else {
                // z.B. {nachname: ..., familienstand: ..., isbn: ...}
                errorFn(err.status, err.error);
            }
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
        });
        return this.httpClient
            .post(this.baseUriKunden, kunde.toJSON(), {
                headers,
                observe: 'response',
                responseType: 'text',
            })
            .pipe(
                map(response => {
                    console.debug(
                        'KundeService.save(): map(): response',
                        response,
                    );
                    const headersResponse = response.headers;
                    let location = headersResponse.get('Location');
                    if (location === null) {
                        location = undefined;
                    }
                    return location;
                }),
            )
            .subscribe(location => successFn(location), errorFnPost);
    }

    /**
     * Ein vorhandenes Kunde aktualisieren
     * @param kunde Das JSON-Objekt mit den aktualisierten Kundedaten
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    update(
        kunde: Kunde,
        successFn: () => void,
        errorFn: (
            status: number,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            errors: { [s: string]: any } | undefined,
        ) => void,
    ) {
        console.log('KundeService.update(): kunde=', kunde);

        const { version } = kunde;
        if (version === undefined) {
            console.error(`Keine Versionsnummer fuer das Kunde ${kunde._id}`);
            return;
        }
        const successFnPut = () => {
            successFn();
            // Wenn Update erfolgreich war, dann wurde serverseitig die Versionsnr erhoeht
            kunde.version++;
        };
        const errorFnPut = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'Client-seitiger oder Netzwerkfehler',
                    err.error.message,
                );
            } else if (errorFn === undefined) {
                console.error('errorFnPut', err);
            } else {
                errorFn(err.status, err.error);
            }
        };

        const uri = `${this.baseUriKunden}/${kunde._id}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            'If-Match': `"${version}"`,
        });
        console.log('headers=', headers);
        return this.httpClient
            .put(uri, kunde, { headers })
            .subscribe(successFnPut, errorFnPut);
    }

    /**
     * Ein Kunde l&ouml;schen
     * @param kunde Das JSON-Objekt mit dem zu loeschenden Kunde
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    remove(
        kunde: Kunde,
        successFn: (() => void) | undefined,
        errorFn: (status: number) => void,
    ) {
        console.log('KundeService.remove(): kunde=', kunde);
        const uri = `${this.baseUriKunden}/${kunde._id}`;

        const errorFnDelete = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'Client-seitiger oder Netzwerkfehler',
                    err.error.message,
                );
            } else if (errorFn === undefined) {
                console.error('errorFnPut', err);
            } else {
                errorFn(err.status);
            }
        };

        return this.httpClient.delete(uri).subscribe(successFn, errorFnDelete);
    }

    // http://www.sitepoint.com/15-best-javascript-charting-libraries
    // http://thenextweb.com/dd/2015/06/12/20-best-javascript-chart-libraries
    // http://mikemcdearmon.com/portfolio/techposts/charting-libraries-using-d3

    // D3 (= Data Driven Documents) https://d3js.org ist das fuehrende Produkt
    // fuer Datenvisualisierung:
    //  initiale Version durch die Dissertation von Mike Bostock
    //  gesponsort von der New York Times, seinem heutigen Arbeitgeber
    //  basiert auf SVG = scalable vector graphics: Punkte, Linien, Kurven, ...
    //  ca 250.000 Downloads/Monat bei https://www.npmjs.com
    //  https://github.com/mbostock/d3 mit ueber 100 Contributors

    // Weitere Alternativen:
    // Google Charts: https://google-developers.appspot.com/chart
    // Chartist.js:   http://gionkunz.github.io/chartist-js
    // n3-chart:      http://n3-charts.github.io/line-chart

    // Chart.js ist deutlich einfacher zu benutzen als D3
    //  basiert auf <canvas>
    //  ca 25.000 Downloads/Monat bei https://www.npmjs.com
    //  https://github.com/nnnick/Chart.js mit ueber 60 Contributors

    /**
     * Ein Balkendiagramm erzeugen und bei einem Tag <code>canvas</code>
     * einf&uuml;gen.
     * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
     */
    /* createBarChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createBarChart()');
        const uri = this.baseUriKunden;
        return this.httpClient
            .get<Array<KundeServer>>(uri)
            .pipe(
                // ID aus Self-Link
                map(kunden => kunden.map(kunde => this.setKundeId(kunde))),
                map(kunden => {
                    const kundenGueltig = kunden.filter(
                        b => b._id !== null && b.rating !== undefined,
                    );
                    const labels = kundenGueltig.map(b => b._id);
                    console.log(
                        'KundeService.createBarChart(): labels: ',
                        labels,
                    );

                    const data = kundenGueltig.map(b => b.rating);
                    const datasets = [{ label: 'Bewertung', data }];

                    return {
                        type: 'bar',
                        data: { labels, datasets },
                    };
                }),
            )
            .subscribe(config =>
                this.diagrammService.createChart(chartElement, config),
            );
    }
    
    /**
     * Ein Liniendiagramm erzeugen und bei einem Tag <code>canvas</code>
     * einf&uuml;gen.
     * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
     */
    /*
    createLinearChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createLinearChart()');
        const uri = this.baseUriKunden;

        return this.httpClient
            .get<Array<KundeServer>>(uri)
            .pipe(
                // ID aus Self-Link
                map(kunden => kunden.map(b => this.setKundeId(b))),
                map(kunden => {
                    const kundenGueltig = kunden.filter(
                        b => b._id !== null && b.rating !== undefined,
                    );
                    const labels = kundenGueltig.map(b => b._id);
                    console.log(
                        'KundeService.createLinearChart(): labels: ',
                        labels,
                    );

                    const data = kundenGueltig.map(b => b.rating);
                    const datasets = [{ label: 'Bewertung', data }];

                    return {
                        type: 'line',
                        data: { labels, datasets },
                    };
                }),
            )
            .subscribe(config =>
                this.diagrammService.createChart(chartElement, config),
            );
    }
    */
    /**
     * Ein Tortendiagramm erzeugen und bei einem Tag <code>canvas</code>
     * einf&uuml;gen.
     * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
     */
    /*
    createPieChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createPieChart()');
        const uri = this.baseUriKunden;

        return this.httpClient
            .get<Array<KundeServer>>(uri)
            .pipe(
                // ID aus Self-Link
                map(kunden => kunden.map(kunde => this.setKundeId(kunde))),
                map(kunden => {
                    const kundenGueltig = kunden.filter(
                        b => b._id !== null && b.rating !== undefined,
                    );
                    const labels = kundenGueltig.map(b => b._id);
                    console.log(
                        'KundeService.createPieChart(): labels: ',
                        labels,
                    );
                    const ratings = kundenGueltig.map(b => b.rating);

                    const anzahl = ratings.length;
                    const backgroundColor = new Array<string>(anzahl);
                    const hoverBackgroundColor = new Array<string>(anzahl);
                    Array(anzahl)
                        .fill(true)
                        .forEach((_, i) => {
                            backgroundColor[
                                i
                            ] = this.diagrammService.getBackgroundColor(i);
                            hoverBackgroundColor[
                                i
                            ] = this.diagrammService.getHoverBackgroundColor(i);
                        });

                    const data: Chart.ChartData = {
                        labels,
                        datasets: [
                            {
                                data: ratings,
                                backgroundColor,
                                hoverBackgroundColor,
                            },
                        ],
                    };

                    return { type: 'pie', data };
                }),
            )
            .subscribe(config =>
                this.diagrammService.createChart(chartElement, config),
            );
    }
    */
    /**
     * Suchkriterien in Request-Parameter konvertieren.
     * @param suchkriterien Suchkriterien fuer den GET-Request.
     * @return Parameter fuer den GET-Request
     */
    private suchkriterienToHttpParams(
        suchkriterien: Suchkriterien,
    ): HttpParams {
        console.log(
            'KundeService.suchkriterienToHttpParams(): suchkriterien=',
            suchkriterien,
        );
        let httpParams = new HttpParams();

        const { nachname, email, geschlecht, interessen } = suchkriterien;
        const { sport, lesen, reisen } = interessen;

        if (nachname !== '') {
            httpParams = httpParams.set('nachname', nachname);
        }
        if (geschlecht !== '') {
            httpParams = httpParams.set('geschlecht', geschlecht);
        }
        if (email !== '') {
            httpParams = httpParams.set('email', email);
        }
        if (sport === true) {
            httpParams = httpParams.set('sport', 'true');
        }
        if (lesen === true) {
            httpParams = httpParams.set('lesen', 'true');
        }
        if (reisen === true) {
            httpParams = httpParams.set('reisen', 'true');
        }
        return httpParams;
    }

    private setKundeId(kunde: KundeServer) {
        const { _links } = kunde;
        if (_links !== undefined) {
            const selfLink = kunde._links.self.href;
            if (typeof selfLink === 'string') {
                const lastSlash = selfLink.lastIndexOf('/');
                kunde._id = selfLink.substring(lastSlash + 1);
            }
        }
        if (kunde._id === undefined) {
            kunde._id = 'undefined';
        }
        return kunde;
    }
}

export interface Suchkriterien {
    nachname: string;
    email: string;
    geschlecht: KundeGeschlecht | '';
    interessen: { sport: boolean; lesen: boolean; reisen: boolean };
}
