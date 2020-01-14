import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Komponente mit dem Tag &lt;hs-create-ort&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Kunde zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-ort',
    templateUrl: './create-ort.component.html',
})
export class CreateOrtComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    readonly form!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly ort = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateOrtComponent.MIN_LENGTH),
        Validators.pattern(/^\w.*$/u),
    ]);
    // readonly ortGroup = new FormGroup({ ort: this.ort })

    readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateOrtComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('ort', this.ort);
    }
}
