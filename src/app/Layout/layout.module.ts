import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppXsnavComponent } from './app-xsnav/app-xsnav.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppContentComponent } from './app-content/app-content.component';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { AppMedicareComponent } from './app-medicare/app-medicare.component';

@NgModule({
  declarations: [
    AppFooterComponent,
    AppHeaderComponent,
    AppNavComponent,
    AppXsnavComponent,
    AppContentComponent,
    AppMedicareComponent,
  ],
  imports: [RouterModule, AppMaterialModule, CommonModule],
  exports: [
    AppFooterComponent,
    AppHeaderComponent,
    AppNavComponent,
    AppXsnavComponent,
    AppContentComponent,
    AppMedicareComponent,
  ],
})
export class LayoutModule {}
