import { NgModule } from '@angular/core';
import { LoaddataService } from '../Services/TestDataService/loaddata.service';
import { AppCompgModule } from './ComponentGlobals/app-compg.module';
import { AppMaterialModule } from './Material/app-material.module';

@NgModule({
  declarations: [],
  imports: [AppMaterialModule, AppCompgModule],
  exports: [AppMaterialModule, AppCompgModule],
  providers: [LoaddataService],
})
export class AppSharedModule {}
