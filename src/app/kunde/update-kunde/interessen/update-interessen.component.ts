import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HOME_PATH } from '../../../shared';
import { Kunde } from '../../shared/kunde';
import { KundeService } from '../../shared/kunde.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente f&uuml;r das Tag <code>hs-interessen</code>
 */
@Component({
    selector: 'hs-update-interessen',
    templateUrl: './update-interessen.component.html',
})
export class UpdateInteressenComponent implements OnInit, OnDestroy {
    // <hs-update-interessen [kunde]="...">
    @Input()
    readonly kunde!: Kunde;

    form!: FormGroup;
    sport!: FormControl;
    lesen!: FormControl;
    reisen!: FormControl;

    readonly faCheck = faCheck;

    private updateSubscription: Subscription | undefined;

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
    ) {
        console.log('UpdateInteressenComponent.constructor()');
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren und mit den
     * Interessenn des zu &auml;ndernden Kundes vorbelegen.
     */
    ngOnInit() {
        console.log('kunde=', this.kunde);

        // Definition und Vorbelegung der Eingabedaten (hier: Checkbox)
        const hasSport = this.kunde.hasInteresse('SPORT');
        this.sport = new FormControl(hasSport);
        const hasLesen = this.kunde.hasInteresse('LESEN');
        this.lesen = new FormControl(hasLesen);
        const hasReisen = this.kunde.hasInteresse('REISEN');
        this.reisen = new FormControl(hasReisen);

        this.form = new FormGroup({
            // siehe ngFormControl innerhalb von @Component({template: `...`})
            sport: this.sport,
            lesen: this.lesen,
            reisen: this.reisen,
        });
    }

    ngOnDestroy() {
        if (this.updateSubscription !== undefined) {
            this.updateSubscription.unsubscribe();
        }
    }

    /**
     * Die aktuellen Interessen f&uuml;r das angezeigte Kunde-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    // eslint-disable-next-line max-lines-per-function
    onUpdate() {
        if (this.form.pristine) {
            console.log(
                'UpdateInteressenComponent.onUpdate(): keine Aenderungen',
            );
            return undefined;
        }

        if (this.kunde === undefined) {
            console.error(
                'UpdateInteressenComponent.onUpdate(): kunde === undefined',
            );
            return undefined;
        }

        this.kunde.updateInteressen(
            this.sport.value,
            this.lesen.value,
            this.reisen.value,
        );
        console.log('kunde=', this.kunde);

        const successFn = () => {
            console.log(
                `UpdateInteressenComponent.onUpdate(): successFn: path: ${HOME_PATH}`,
            );
            this.router.navigate([HOME_PATH]).then(
                navResult => {
                    if (navResult) {
                        console.log(
                            'UpdateInteressenComponent.onUpdate(): Navigation',
                        );
                    } else {
                        console.error(
                            'UpdateInteressenComponent.onUpdate(): Navigation fehlgeschlagen',
                        );
                    }
                },
                () =>
                    console.error(
                        'UpdateInteressenComponent.onUpdate(): Navigation fehlgeschlagen',
                    ),
            );
        };
        const errorFn: (
            status: number,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            errors: { [s: string]: any } | undefined,
        ) => void = (status, errors = undefined) => {
            console.error(
                `UpdateInteressenComponent.onUpdate(): errorFn(): status: ${status}, errors=`,
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
