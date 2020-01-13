import { Component, Input, OnInit } from '@angular/core';
import { Familienstand } from '../../shared/kunde';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-familienstand</code>
 */
@Component({
    selector: 'hs-details-familienstand',
    templateUrl: './details-familienstand.component.html',
})
export class DetailsFamilienstandComponent implements OnInit {
    @Input()
    readonly familienstand: Familienstand | undefined | '';

    ngOnInit() {
        console.log(
            `DetailsFamilienstandComponent.familienstand=${this.familienstand}`,
        );
    }
}
