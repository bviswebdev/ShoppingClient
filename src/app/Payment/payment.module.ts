import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCartComponent } from './payment-cart/payment-cart.component';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentCartComponent],
  imports: [RouterModule, AppMaterialModule, CommonModule, ReactiveFormsModule],
  exports: [PaymentCartComponent],
})
export class PaymentModule {}
