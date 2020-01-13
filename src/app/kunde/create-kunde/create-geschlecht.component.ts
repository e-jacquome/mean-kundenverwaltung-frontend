import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Komponente mit dem Tag &lt;hs-create-geschlecht&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly geschlecht = new FormControl('M');

    ngOnInit() {
        console.log('CreateGeschlechtComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
