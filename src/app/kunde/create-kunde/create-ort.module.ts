import { CommonModule } from '@angular/common';
import { CreateOrtComponent } from './create-ort.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateOrtComponent],
    exports: [CreateOrtComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateOrtModule {}
