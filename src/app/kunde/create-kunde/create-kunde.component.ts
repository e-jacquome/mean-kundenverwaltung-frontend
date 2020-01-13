import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    faCheck,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../shared';
import { Kunde } from '../shared/kunde';
import { KundeService } from '../shared/kunde.service';

import { Router } from '@angular/router';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

/**
 * Komponente mit dem Tag &lt;create-kunde&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-kunde',
    templateUrl: './create-kunde.component.html',
})
export class CreateKundeComponent implements OnInit, OnDestroy {
    form = new FormGroup({});
    showWarning = false;
    fertig = false;
    errorMsg = undefined;

    readonly faCheck = faCheck;
    readonly faExclamationTriangle = faExclamationTriangle;
    readonly faExclamationTriangleSize: SizeProp = '2x';

    private saveSubscription: Subscription | undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
        private readonly titleService: Title,
    ) {
        console.log('CreateKundeComponent.constructor()');
        if (router !== undefined) {
            console.log('Injizierter Router:', router);
        }
    }

    ngOnInit() {
        this.titleService.setTitle('Neuer Kunde');
    }

    ngOnDestroy() {
        if (this.saveSubscription !== undefined) {
            this.saveSubscription.unsubscribe();
        }
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neues Kunde anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onSave() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid     true/false
        //    dirty     true/false, falls der Wert geaendert wurde

        if (!this.form.valid) {
            console.log(
                'CreateKundeComponent.onSave(): Validierungsfehler',
                this.form,
            );
            return false;
        }

        const neuerKunde = Kunde.fromForm(this.form.value);
        console.log('CreateKundeComponent.onSave(): neuesKunde=', neuerKunde);

        const successFn = (location: string | undefined) => {
            console.log(
                `CreateKundeComponent.onSave(): successFn(): location=${location}, navigate=${HOME_PATH}`,
            );
            this.fertig = true;
            this.showWarning = false;
            this.router.navigate([HOME_PATH]).then(
                navResult => {
                    if (navResult) {
                        console.log('CreateKunde.onSave(): Navigation');
                        this.errorMsg = undefined;
                    } else {
                        console.error(
                            'CreateKunde.onSave(): Navigation fehlgeschlagen',
                        );
                        this.errorMsg = 'Navigation fehlgeschlagen';
                    }
                },
                () => {
                    console.error(
                        'CreateKunde.onSave(): Navigation fehlgeschlagen',
                    );
                    this.errorMsg = 'Navigation fehlgeschlagen';
                },
            );
        };
        const errorFn = (
            status: number,
            errors: { [s: string]: any } | undefined, // eslint-disable-line @typescript-eslint/no-explicit-any
        ) => {
            console.error(
                `CreateKunde.onSave(): errorFn(): status: ${status}, errors`,
                errors,
            );
            this.errorMsg = errors;
        };
        this.saveSubscription = this.kundeService.save(
            neuerKunde,
            successFn,
            errorFn,
        );

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum Refresh
        // der gesamten Seite
        return false;
    }
}
