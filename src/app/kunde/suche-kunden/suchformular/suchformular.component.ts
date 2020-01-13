/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy oSf the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Output, ViewChild } from '@angular/core';
import { faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { SucheEmailComponent } from './suche-email.component';
import { SucheGeschlechtComponent } from './suche-geschlecht.component';
import { SucheInteressenComponent } from './suche-interessen.component';
import { SucheNachnameComponent } from './suche-nachname.component';
import { Suchkriterien } from '../../shared/kunde.service';
import { fadeIn } from '../../../shared';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchformular</code>
 */
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
})
export class SuchformularComponent {
    // Event Binding: <hs-suchformular (waiting)="...">
    // in RxJS: Observables = Event-Streaming mit Promises
    // Subject statt der Basisklasse Observable, damit next() in onFind() aufgerufen werden kann
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    @Output()
    readonly suchkriterien = new Subject<Suchkriterien>();

    readonly faInfoCircle = faInfoCircle;
    readonly faSearch = faSearch;

    // DI der Child-Komponente, um auf deren Attribut (hier: "nachname") zuzugreifen
    // @Output in SucheNachnameComponent wuerde Subject<> erfordern
    // https://angular.io/guide/component-interaction#parent-calls-an-viewchild
    // query results available in ngOnInit
    @ViewChild(SucheNachnameComponent, { static: true })
    private readonly sucheNachnameComponent!: SucheNachnameComponent;

    @ViewChild(SucheEmailComponent, { static: true })
    private readonly sucheEmailComponent!: SucheEmailComponent;

    @ViewChild(SucheGeschlechtComponent, { static: true })
    private readonly sucheGeschlechtComponent!: SucheGeschlechtComponent;

    @ViewChild(SucheInteressenComponent, { static: true })
    private readonly sucheInteressenComponent!: SucheInteressenComponent;

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor() {
        console.log('SuchformularComponent.constructor()');
    }

    /**
     * Suche nach Kunden, die den spezfizierten Suchkriterien entsprechen
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onFind() {
        const { nachname } = this.sucheNachnameComponent;
        const { email } = this.sucheEmailComponent;
        const { geschlecht } = this.sucheGeschlechtComponent;
        const { sport } = this.sucheInteressenComponent;
        const { lesen } = this.sucheInteressenComponent;
        const { reisen } = this.sucheInteressenComponent;
        console.log(
            `SuchformularComponent.onFind(): nachname=${nachname}, email=${email}, geschlecht=${geschlecht}, sport=${sport}, lesen=${lesen}, reisen=${reisen}`,
        );

        this.suchkriterien.next({
            nachname,
            email,
            geschlecht,
            interessen: { sport, lesen, reisen },
        });

        // Inspektion der Komponente mit dem Tag-Namen "app" im Debugger
        // Voraussetzung: globale Variable ng deklarieren (s.o.)
        // const app: any = document.querySelector('app')
        // global.ng.probe(app)

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite.
        return false;
    }
}
