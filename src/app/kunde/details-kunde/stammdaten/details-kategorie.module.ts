import { CommonModule } from '@angular/common';
import { DetailsKategorieComponent } from './details-kategorie.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsKategorieComponent],
    exports: [DetailsKategorieComponent],
    imports: [CommonModule],
})
export class DetailsKategorieModule {}
