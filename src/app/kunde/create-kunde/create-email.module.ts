import { CommonModule } from '@angular/common';
import { CreateEmailComponent } from './create-email.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateEmailComponent],
    exports: [CreateEmailComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateEmailModule {}
