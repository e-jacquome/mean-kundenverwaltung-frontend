import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-nachname&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-nachname',
    templateUrl: './create-nachname.component.html',
})
export class CreateNachnameComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    readonly form!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly nachname = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateNachnameComponent.MIN_LENGTH),
        Validators.pattern(/^\w.*$/u),
    ]);
    // readonly nachnameGroup = new FormGroup({ nachname: this.nachname })

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateNachnameComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('nachname', this.nachname);
    }
}
