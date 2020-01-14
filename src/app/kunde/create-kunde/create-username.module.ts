import { CommonModule } from '@angular/common';
import { CreateUsernameComponent } from './create-username.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateUsernameComponent],
    exports: [CreateUsernameComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateUsernameModule {}
