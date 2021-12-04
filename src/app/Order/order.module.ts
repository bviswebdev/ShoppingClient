import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderConfirmComponent],
  imports: [RouterModule, AppMaterialModule, CommonModule, ReactiveFormsModule],
  exports: [OrderConfirmComponent],
})
export class OrderModule {}
