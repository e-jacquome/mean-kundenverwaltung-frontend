import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-password&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-password',
    templateUrl: './create-password.component.html',
})
export class CreatePasswordComponent implements OnInit {
    private static readonly MIN_LENGTH = 1;

    @Input()
    readonly form!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly password = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreatePasswordComponent.MIN_LENGTH),
        Validators.pattern(/^\w.*$/u),
    ]);
    // readonly passwordGroup = new FormGroup({ password: this.password })

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreatePasswordComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('password', this.password);
    }
}
