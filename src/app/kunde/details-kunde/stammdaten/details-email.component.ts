import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hs-details-email',
    template: `
        <div class="row mt-2">
            <label class="col col-2"> Email </label>
            <div class="col col-10">{{ email }}</div>
        </div>
    `,
})
export class DetailsEmailComponent implements OnInit {
    @Input()
    readonly email!: string;

    ngOnInit() {
        console.log(`DetailsEmailComponent.email=${this.email}`);
    }
}
