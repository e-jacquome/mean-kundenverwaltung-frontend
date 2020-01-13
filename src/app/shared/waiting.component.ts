import { Component } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'hs-waiting',
    template: `
        <div>
            <fa-icon [icon]="faSpinner"></fa-icon>
            <span class="ml-1">
                Ihre Webinhalte werden geladen, bitte haben Sie einen Moment
                Gedult. . .
            </span>
        </div>
    `,
})
export class WaitingComponent {
    readonly faSpinner = faSpinner;

    constructor() {
        console.log('WaitingComponent.constructor()');
    }
}
