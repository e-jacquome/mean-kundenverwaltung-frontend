import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { CreateKundeComponent } from './create-kunde.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// https://angular.io/api/router/CanDeactivate
// https://angular.io/guide/router#can-deactivate-guard

@Injectable({ providedIn: 'root' })
export class CreateKundeGuard implements CanDeactivate<CreateKundeComponent> {
    constructor() {
        console.log('CreateKundeGuard.constructor()');
    }

    canDeactivate(
        createKunde: CreateKundeComponent,
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (createKunde.fertig) {
            // Seite darf zur gewuenschten URL verlassen werden
            return true;
        }

        createKunde.showWarning = true;
        createKunde.fertig = true;
        console.warn('CreateKundeGuard.canDeactivate(): Verlassen der Seite');
        return false;
    }
}
