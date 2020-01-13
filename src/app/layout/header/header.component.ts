import { Component } from '@angular/core';

/**
 * Komponente f&uuml;r die Kopfleiste mit dem Tag &lt;hs-header&gt;.
 */
@Component({
    selector: 'hs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    // styles: [
    //     `header {
    //         background-color: #BED6F8;
    //         background-position: left top;
    //         background-repeat: repeat-x;
    //         background-image: url(/assets/img/gradientBlueSky.png);
    //      }`
    // ]
})
export class HeaderComponent {
    constructor() {
        console.log('HeaderComponent.constructor()');
    }
}
