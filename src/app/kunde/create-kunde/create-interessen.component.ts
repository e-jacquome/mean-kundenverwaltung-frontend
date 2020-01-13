import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Komponente mit dem Tag &lt;hs-create-interessen&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-interessen',
    templateUrl: './create-interessen.component.html',
})
export class CreateInteressenComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly sport = new FormControl(false);
    readonly lesen = new FormControl(false);
    readonly reisen = new FormControl(false);

    ngOnInit() {
        console.log('CreateInteressenComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('sport', this.sport);
        this.form.addControl('lesen', this.lesen);
        this.form.addControl('reisen', this.reisen);
    }
}
