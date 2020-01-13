import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-umsatz</code>
 */
@Component({
    selector: 'hs-details-umsatz',
    templateUrl: './details-umsatz.component.html',
})
export class DetailsUmsatzComponent implements OnInit {
    @Input()
    readonly umsatz!: number | '';

    ngOnInit() {
        console.log(`DetailsUmsatzComponent.umsatz=${this.umsatz}`);
    }
}
