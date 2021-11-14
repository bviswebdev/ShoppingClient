import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TestDataComponent } from './test-data/test-data.component';
import { AppNotfoundComponent } from './app-notfound/app-notfound.component';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AppBreadcrumbComponent } from './app-breadcrumb/app-breadcrumb.component';

@NgModule({
  declarations: [TestDataComponent, AppNotfoundComponent, AppBreadcrumbComponent],
  imports: [AppMaterialModule, RouterModule, CommonModule],
  exports: [TestDataComponent],
})
export class AppCompgModule {}
