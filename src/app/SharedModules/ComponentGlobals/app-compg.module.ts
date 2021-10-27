import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../Material/app-material.module';
import { TestDataComponent } from './test-data/test-data.component';

@NgModule({
  declarations: [TestDataComponent],
  imports: [AppMaterialModule, CommonModule],
  exports: [TestDataComponent],
})
export class AppCompgModule {}
