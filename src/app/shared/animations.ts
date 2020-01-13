import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

// https://angular.io/docs/ts/latest/guide/animations.html
// https://www.w3.org/TR/css3-transitions/#animatable-properties
// Animationen in Angular basieren auf dem "Web Animations API"
// alternativ gibt es noch: CSS Transitions und CSS Keyframes

// to ease = entspannen, beruhigen
// http://easings.net Daten kommen zunaechst langsam herein
export const easeIn = trigger('easeIn', [
    // von ganz links und zunaechst unsichtbar
    state('active', style({ transform: 'translateX(0)' })),
    transition(':enter', [
        style({
            transform: 'translateX(-100%)',
            opacity: 0,
        }),
        // Ende nach 0.5s
        animate('0.5s ease-in'),
    ]),
]);

export const easeOut = trigger('easeOut', [
    transition(':leave', [
        // Ende nach 0.5s und ganz rechts
        animate(
            '0.5s ease-out',
            style({
                transform: 'translateX(100%)',
                opacity: 0,
            }),
        ),
    ]),
]);

// to fade in = einblenden
export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        // Start: zunaechst unsichtbar
        style({ opacity: 0 }),
        // Ende nach 0.3s bei voller Sichtbarkeit
        animate('0.3s', style({ opacity: 1 })),
    ]),
]);
