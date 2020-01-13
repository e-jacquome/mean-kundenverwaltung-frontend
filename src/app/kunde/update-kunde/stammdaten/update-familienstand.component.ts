import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Familienstand } from '../../shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-familienstand</code>
 */
@Component({
    selector: 'hs-update-familienstand',
    templateUrl: './update-familienstand.component.html',
})
export class UpdateFamilienstandComponent implements OnInit {
    // <hs-update-familienstand [form]="form" [currentValue]="...">
    @Input()
    readonly form!: FormGroup;
    @Input()
    readonly currentValue: Familienstand | undefined | '';

    familienstand!: FormControl;

    ngOnInit() {
        console.log(
            'UpdateFamilienstandComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.familienstand = new FormControl(this.currentValue);
        this.form.addControl('familienstand', this.familienstand);
    }
}
