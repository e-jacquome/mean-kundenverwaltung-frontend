import { Component } from '@angular/core';

/**
 * Komponente f&uuml;r den Hauptteil einer Seite mit dem Tag &lt;hs-main&gt;.
 */
@Component({
    selector: 'hs-main',
    // router-outlet: Komponente fuer das Routing, d.h.
    // Platzhalter fuer den Austausch der HTML-Templates (= Fragmente)
    // beim Routing
    template: `
        <main>
            <div class="col col-12 mt-3"><router-outlet></router-outlet></div>
        </main>
    `,
})
export class MainComponent {
    constructor() {
        console.log('MainComponent.constructor()');
    }
}
