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
                        Herzlich Willkommen im Customer-Relationship-Management-System von JBGB.
                    </h2>
                    <h3>
                        Sie können gerne in unserer Datenbank nach Kundendaten
                        suchen.
                    </h3>
                </span>
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
