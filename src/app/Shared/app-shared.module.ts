import { NgModule } from '@angular/core';
import { LoaddataService } from '../Services/TestDataService/loaddata.service';
import { AppCompgModule } from './ComponentGlobals/app-compg.module';

@NgModule({
  declarations: [],
  imports: [AppCompgModule],
  exports: [AppCompgModule],
  providers: [LoaddataService],
})
export class AppSharedModule {}
