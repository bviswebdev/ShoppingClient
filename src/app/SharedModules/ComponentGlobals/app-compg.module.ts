import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../Material/app-material.module';
import { TestDataComponent } from './test-data/test-data.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppContentComponent } from './app-content/app-content.component';

@NgModule({
  declarations: [
    TestDataComponent,
    AppHeaderComponent,
    AppNavComponent,
    AppFooterComponent,
    AppContentComponent,
  ],
  imports: [AppMaterialModule, CommonModule],
  exports: [
    TestDataComponent,
    AppHeaderComponent,
    AppNavComponent,
    AppFooterComponent,
    AppContentComponent,
  ],
})
export class AppCompgModule {}
