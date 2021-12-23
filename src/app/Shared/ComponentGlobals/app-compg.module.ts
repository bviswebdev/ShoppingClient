import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TestDataComponent } from './test-data/test-data.component';
import { AppNotfoundComponent } from './app-notfound/app-notfound.component';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AppBreadcrumbComponent } from './app-breadcrumb/app-breadcrumb.component';
import { AppErrorComponent } from './app-error/app-error.component';

@NgModule({
  declarations: [
    TestDataComponent,
    AppNotfoundComponent,
    AppBreadcrumbComponent,
    AppErrorComponent,
  ],
  imports: [AppMaterialModule, RouterModule, CommonModule],
  exports: [TestDataComponent, AppBreadcrumbComponent, AppErrorComponent],
})
export class AppCompgModule {}
