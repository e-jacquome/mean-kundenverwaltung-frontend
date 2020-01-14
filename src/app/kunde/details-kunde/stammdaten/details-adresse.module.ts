import { CommonModule } from '@angular/common';
import { DetailsAdresseComponent } from './details-adresse.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsAdresseComponent],
    exports: [DetailsAdresseComponent],
    imports: [CommonModule],
})
export class DetailsAdresseModule {}
