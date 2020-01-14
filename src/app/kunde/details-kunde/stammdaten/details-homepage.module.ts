import { CommonModule } from '@angular/common';
import { DetailsHomepageComponent } from './details-homepage.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [DetailsHomepageComponent],
    exports: [DetailsHomepageComponent],
    imports: [CommonModule],
})
export class DetailsHomepageModule {}
