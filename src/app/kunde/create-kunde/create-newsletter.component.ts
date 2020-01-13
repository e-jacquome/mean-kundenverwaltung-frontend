import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Komponente mit dem Tag &lt;hs-create-newsletter&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    selector: 'hs-create-newsletter',
    templateUrl: './create-newsletter.component.html',
})
export class CreateNewsletterComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly newsletter = new FormControl(false);

    ngOnInit() {
        console.log('CreateNewsletterComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('newsletter', this.newsletter);
    }
}
