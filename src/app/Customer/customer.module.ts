import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomertestComponent } from './Components/customertest/customertest.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './Components/customer/customer.component';
import { AppPublicModule } from '../Public/app-public.module';

@NgModule({
  declarations: [CustomertestComponent, CustomerComponent],
  imports: [CommonModule, CustomerRoutingModule, AppPublicModule],
  exports: [],
})
export class CustomerModule {}
