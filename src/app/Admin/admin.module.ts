import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmintestComponent } from './Components/admintest/admintest.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './Components/admin/admin.component';

@NgModule({
  declarations: [AdmintestComponent, AdminComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
