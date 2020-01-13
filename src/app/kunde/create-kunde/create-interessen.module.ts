import { CreateInteressenComponent } from './create-interessen.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CreateInteressenComponent],
    exports: [CreateInteressenComponent],
    imports: [ReactiveFormsModule],
})
export class CreateInteressenModule {}
