import { Component, Input } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente f&uuml;r die Darstellung einer Fehlermeldung durch das Tag
 * &lt;hs-error-message [text]="..."&gt;
 */
@Component({
    selector: 'hs-error-message',
    // ggf. Sweetalert2 https://github.com/sweetalert2/sweetalert2
    template: `
        <div class="text-danger" *ngIf="text">
            <fa-icon [icon]="faExclamationCircle"></fa-icon>
            <span class="font-weight-bold ml-1">{{ text }}</span>
        </div>
    `,
})
export class ErrorMessageComponent {
    // Property Binding: <hs-error-message [text]="...">
    // siehe InputMetadata
    @Input()
    text: string | undefined;

    readonly faExclamationCircle = faExclamationCircle;

    constructor() {
        console.log('ErrorMessageComponent.constructor()');
    }
}
