import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-familienstand&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-familienstand',
    templateUrl: './create-familienstand.component.html',
})
export class CreateFamilienstandComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly familienstand = new FormControl(undefined, Validators.required);

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateFamilienstandComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('familienstand', this.familienstand);
    }
}
