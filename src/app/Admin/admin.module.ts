import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmintestComponent } from './Components/admintest/admintest.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './Components/admin/admin.component';
import { AppPublicModule } from '../Public/app-public.module';
import { AdminProductaddComponent } from './Components/admin-productadd/admin-productadd.component';
import { AdminProductupdateComponent } from './Components/admin-productupdate/admin-productupdate.component';
import { ProductModule } from '../Product/product.module';
import { AppSharedModule } from '../Shared/app-shared.module';

@NgModule({
  declarations: [
    AdmintestComponent,
    AdminComponent,
    AdminProductaddComponent,
    AdminProductupdateComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppPublicModule,
    ProductModule,
    AppSharedModule,
  ],
  exports: [],
})
export class AdminModule {}
