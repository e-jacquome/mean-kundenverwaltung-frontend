import { CommonModule } from '@angular/common';
import { DetailsEmailComponent } from './details-email.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsEmailComponent],
    exports: [DetailsEmailComponent],
    imports: [CommonModule],
})
export class DetailsEmailModule {}
