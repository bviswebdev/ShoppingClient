import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../Material/app-material.module';
import { TestDataComponent } from './test-data/test-data.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppContentComponent } from './app-content/app-content.component';
import { AppNotfoundComponent } from './app-notfound/app-notfound.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    TestDataComponent,
    AppHeaderComponent,
    AppNavComponent,
    AppFooterComponent,
    AppContentComponent,
    AppNotfoundComponent,
  ],
  imports: [AppMaterialModule, RouterModule, CommonModule],
  exports: [
    TestDataComponent,
    AppHeaderComponent,
    AppNavComponent,
    AppFooterComponent,
    AppContentComponent,
  ],
})
export class AppCompgModule {}
