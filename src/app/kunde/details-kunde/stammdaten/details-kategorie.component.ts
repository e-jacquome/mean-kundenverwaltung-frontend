import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-kategorie</code>
 */
@Component({
    selector: 'hs-details-kategorie',
    templateUrl: './details-kategorie.component.html',
})
export class DetailsKategorieComponent implements OnInit {
    @Input()
    readonly kategorie!: number | '';

    ngOnInit() {
        console.log(`DetailsKategorieComponent.kategorie=${this.kategorie}`);
    }
}
