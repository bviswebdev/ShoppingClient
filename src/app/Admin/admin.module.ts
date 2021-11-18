import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmintestComponent } from './Components/admintest/admintest.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './Components/admin/admin.component';
import { AppPublicModule } from '../Public/app-public.module';

@NgModule({
  declarations: [AdmintestComponent, AdminComponent],
  imports: [CommonModule, AdminRoutingModule, AppPublicModule],
  exports: [],
})
export class AdminModule {}
