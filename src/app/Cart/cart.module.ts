import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCartComponent } from './user-cart/user-cart.component';
import { AppMaterialModule } from '../app-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserCartComponent],
  imports: [RouterModule, AppMaterialModule, CommonModule],
  exports: [UserCartComponent],
})
export class CartModule {}
