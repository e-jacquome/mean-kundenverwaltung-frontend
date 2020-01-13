import { Component, Input, OnInit } from '@angular/core';
import { KundeGeschlecht } from '../../shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-geschlecht</code>
 */
@Component({
    selector: 'hs-details-geschlecht',
    templateUrl: './details-geschlecht.component.html',
})
export class DetailsGeschlechtComponent implements OnInit {
    @Input()
    readonly geschlecht!: KundeGeschlecht;

    ngOnInit() {
        console.log(`DetailsGeschlechtComponent.geschlecht=${this.geschlecht}`);
    }
}
