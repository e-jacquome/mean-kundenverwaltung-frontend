import { CommonModule } from '@angular/common';
import { CreatePlzComponent } from './create-plz.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreatePlzComponent],
    exports: [CreatePlzComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreatePlzModule {}
