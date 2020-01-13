import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-interessen</code>
 */
@Component({
    selector: 'hs-details-interessen',
    templateUrl: 'details-interessen.component.html',
})
export class DetailsInteressenComponent implements OnInit {
    // <hs-interessen [values]="kunde.interessen">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    readonly values!: Array<string>;

    ngOnInit() {
        console.log('DetailsInteressenComponent.values=', this.values);
    }
}
