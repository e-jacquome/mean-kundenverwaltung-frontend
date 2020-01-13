import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    faAddressCard,
    faChartBar,
    faChartLine,
    faChartPie,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

/**
 * Komponente f&uuml;r die Navigationsleiste mit dem Tag &lt;hs-nav&gt;.
 */
@Component({
    selector: 'hs-nav',
    templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit, OnDestroy {
    isAdmin!: boolean;

    readonly faAddressCard = faAddressCard;
    readonly faChartBar = faChartBar;
    readonly faChartLine = faChartLine;
    readonly faChartPie = faChartPie;
    readonly faSearch = faSearch;

    private isAdminSubscription!: Subscription;

    constructor(private readonly authService: AuthService) {
        console.log('NavComponent.constructor()');
    }

    ngOnInit() {
        this.isAdmin = this.authService.isAdmin;

        // beobachten, ob es Informationen zur Rolle "admin" gibt
        this.isAdminSubscription = this.subscribeIsAdmin();
    }

    ngOnDestroy() {
        this.isAdminSubscription.unsubscribe();
    }

    private subscribeIsAdmin() {
        const next = (event: Array<string>) => {
            this.isAdmin = event !== undefined && event.includes(ROLLE_ADMIN);
            console.log('NavComponent.isAdmin:', this.isAdmin);
        };
        return this.authService.rollenSubject.subscribe(next);
    }
}
