import { Component, Input, OnInit } from '@angular/core';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-newsletter</code>
 */
@Component({
    selector: 'hs-details-newsletter',
    templateUrl: './details-newsletter.component.html',
})
export class DetailsNewsletterComponent implements OnInit {
    @Input()
    readonly newsletter!: boolean;

    ngOnInit() {
        console.log(`DetailsNewsletterComponent.newsletter=${this.newsletter}`);
    }
}
