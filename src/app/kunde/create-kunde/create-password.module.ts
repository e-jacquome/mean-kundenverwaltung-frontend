import { CommonModule } from '@angular/common';
import { CreatePasswordComponent } from './create-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreatePasswordComponent],
    exports: [CreatePasswordComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreatePasswordModule {}
