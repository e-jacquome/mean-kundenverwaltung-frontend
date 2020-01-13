import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-nachname</code>
 */
@Component({
    selector: 'hs-details-nachname',
    template: `
        <div class="row mt-2">
            <label class="col col-1"> Nachname </label>
            <div class="col col-11">{{ nachname }}</div>
        </div>
    `,
})
export class DetailsNachnameComponent implements OnInit {
    @Input()
    readonly nachname!: string;

    ngOnInit() {
        console.log(`DetailsNachnameComponent.nachname=${this.nachname}`);
    }
}
