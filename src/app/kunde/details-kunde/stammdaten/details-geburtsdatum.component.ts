import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-geburtsdatum</code>
 */
@Component({
    selector: 'hs-details-geburtsdatum',
    templateUrl: './details-geburtsdatum.component.html',
})
export class DetailsGeburtsdatumComponent implements OnInit {
    @Input()
    readonly formatted!: string;

    ngOnInit() {
        console.log(
            `DetailsGeburtsdatumComponent: formatted=${this.formatted}`,
        );
    }
}
