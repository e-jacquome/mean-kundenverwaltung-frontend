import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-umsatz&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-umsatz',
    templateUrl: './create-umsatz.component.html',
})
export class CreateUmsatzComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly umsatz = new FormControl(undefined, Validators.required);

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateUmsatzComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('umsatz', this.umsatz);
    }
}
