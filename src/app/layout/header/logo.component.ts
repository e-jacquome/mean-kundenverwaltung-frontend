import { Component } from '@angular/core';

/**
 * Komponente f&uuml;r das Logo mit dem Tag &lt;kunden-logo&gt;.
 */
@Component({
    selector: 'kunden-logo',
    template: `
        <a routerLink="/">
            <img
                src="/assets/img/kunden-icon.png"
                alt="Logo"
                height="72"
                width="400"
            />
        </a>
    `,
})
export class LogoComponent {
    constructor() {
        console.log('LogoComponent.constructor()');
    }
}
