import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-betrag</code>
 */
@Component({
    selector: 'hs-details-betrag',
    template: `
        <div class="row mt-2">
            <label class="col col-2"> Betrag </label>
            <div class="col col-10">{{ betrag }}€</div>
        </div>
    `,
})
export class DetailsBetragComponent implements OnInit {
    @Input()
    readonly betrag!: number | '';

    ngOnInit() {
        console.log(`DetailsBetragComponent.betrag=${this.betrag}`);
    }
}
