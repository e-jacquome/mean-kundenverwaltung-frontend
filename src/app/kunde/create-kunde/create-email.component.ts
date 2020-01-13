import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'hs-create-email',
    templateUrl: './create-email.component.html',
})
export class CreateEmailComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    readonly form!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly email = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateEmailComponent.MIN_LENGTH),
    ]);

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateEmailComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('email', this.email);
    }
}
