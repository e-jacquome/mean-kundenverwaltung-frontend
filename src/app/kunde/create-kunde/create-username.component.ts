import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-username&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Kunde zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-username',
    templateUrl: './create-username.component.html',
})
export class CreateUsernameComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    readonly form!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly username = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateUsernameComponent.MIN_LENGTH),
        Validators.pattern(/^\w.*$/u),
    ]);
    // readonly usernameGroup = new FormGroup({ username: this.username })

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateUsernameComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('username', this.username);
    }
}
