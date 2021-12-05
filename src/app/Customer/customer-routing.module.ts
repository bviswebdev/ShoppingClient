import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './Components/customer/customer.component';
import { CustomertestComponent } from './Components/customertest/customertest.component';
import { AuthcustomerGuard } from '../Guards/authcustomer.guard';
import { PubHomeComponent } from '../Public/PublicComp/pub-home/pub-home.component';
import { CustomerCartComponent } from './Components/customer-cart/customer-cart.component';
import { CustomerCheckoutComponent } from './Components/customer-checkout/customer-checkout.component';
import { CustomerPaymentComponent } from './Components/customer-payment/customer-payment.component';
import { CustomerOrderconfirmComponent } from './Components/customer-orderconfirm/customer-orderconfirm.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthcustomerGuard],
    canActivateChild: [AuthcustomerGuard],
    children: [
      {
        path: '',
        component: PubHomeComponent,
      },
      {
        path: 'test',
        component: CustomertestComponent,
      },
      {
        path: 'cart',
        component: CustomerCartComponent,
      },
      {
        path: 'checkout',
        component: CustomerCheckoutComponent,
      },
      {
        path: 'payment',
        component: CustomerPaymentComponent,
      },
      {
        path: 'orderconfirm',
        component: CustomerOrderconfirmComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
