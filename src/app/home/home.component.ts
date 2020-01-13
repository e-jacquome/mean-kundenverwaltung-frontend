import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faChild } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'hs-home',
    template: `
        <div class="row d-flex justify-content-center align-self-center">
            <div class="col-md-5">
                <span>
                    <h2>
                        Herzlich Willkommen in der JBGB-Kundenverwaltung!
                    </h2>
                    <h3>
                        Sie können gerne in unserer Datenbank nach Kundendaten suchen.
                    </h3>
                </span>
            </div>
        </div>
        <div class="row d-flex justify-content-center align-self-center">
            <div class="col-md-6 offset-md-1">
                <fa-icon
                    class="offset-md-4"
                    [icon]="faChild"
                    size="8x"
                ></fa-icon>
            </div>
        </div>
        <router-outlet></router-outlet>
    `,
})
export class HomeComponent implements OnInit {
    readonly faChild = faChild;

    constructor(private readonly title: Title) {
        console.log('HomeComponent.constructor()');
    }

    ngOnInit() {
        this.title.setTitle('Kundenverwaltung');
    }
}