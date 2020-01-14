import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hs-details-homepage',
    template: `
        <div class="row mt-2">
            <label class="col col-2"> Homepage </label>
            <div class="col col-10">{{ homepage }}</div>
        </div>
    `,
})
export class DetailsHomepageComponent implements OnInit {
    @Input()
    readonly homepage!: string;

    ngOnInit() {
        console.log(`DetailsHomepageComponent.homepage=${this.homepage}`);
    }
}
