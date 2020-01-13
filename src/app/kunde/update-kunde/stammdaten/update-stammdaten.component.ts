import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
    faCheck,
    faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../../shared';
import { Kunde } from '../../shared/kunde';
import { KundeService } from '../../shared/kunde.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-stammdaten</code>
 */
@Component({
    selector: 'hs-update-stammdaten',
    templateUrl: './update-stammdaten.component.html',
})
export class UpdateStammdatenComponent implements OnInit, OnDestroy {
    // <hs-update-stammdaten [kunde]="...">
    @Input()
    readonly kunde!: Kunde;

    readonly form = new FormGroup({});

    readonly faCheck = faCheck;
    readonly faExclamationCircle = faExclamationCircle;

    private updateSubscription: Subscription | undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
    ) {
        console.log('UpdateStammdatenComponent.constructor()');
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren und mit den
     * Stammdaten des zu &auml;ndernden Kundes vorbelegen.
     */
    ngOnInit() {
        console.log('UpdateStammdatenComponent.ngOnInit(): kunde=', this.kunde);
    }

    ngOnDestroy() {
        if (this.updateSubscription !== undefined) {
            this.updateSubscription.unsubscribe();
        }
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Kunde-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onUpdate() {
        if (this.form.pristine) {
            console.log(
                'UpdateStammdatenComponent.onUpdate(): keine Aenderungen',
            );
            return undefined;
        }

        if (this.kunde === undefined) {
            console.error(
                'UpdateStammdatenComponent.onUpdate(): kunde === undefined',
            );
            return undefined;
        }

        // rating, umsatz und rabatt koennen im Formular nicht geaendert werden
        this.kunde.updateStammdaten(
            this.form.value.nachname,
            this.form.value.geschlecht,
            this.form.value.familienstand,
            this.form.value.rating,
            this.kunde.geburtsdatum,
            this.kunde.umsatz,
        );
        console.log('kunde=', this.kunde);

        const successFn = () => {
            console.log(
                `UpdateStammdaten.onUpdate(): successFn: path: ${HOME_PATH}`,
            );
            this.router.navigate([HOME_PATH]).then(
                navResult => {
                    if (navResult) {
                        console.log('UpdateStammdaten.onUpdate(): Navigation');
                    } else {
                        console.error(
                            'UpdateStammdaten.onUpdate(): Navigation fehlgeschlagen',
                        );
                    }
                },
                () =>
                    console.error(
                        'UpdateStammdaten.onUpdate(): Navigation fehlgeschlagen',
                    ),
            );
        };
        const errorFn: (
            status: number,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            errors: { [s: string]: any } | undefined,
        ) => void = (status, errors = undefined) => {
            console.error(
                `UpdateStammdatenComponent.onUpdate(): errorFn(): status: ${status}, errors=`,
                errors,
            );
        };

        this.updateSubscription = this.kundeService.update(
            this.kunde,
            successFn,
            errorFn,
        );

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }
}
