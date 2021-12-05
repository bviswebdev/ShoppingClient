import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomertestComponent } from './Components/customertest/customertest.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './Components/customer/customer.component';
import { AppPublicModule } from '../Public/app-public.module';
import { CustomerCartComponent } from './Components/customer-cart/customer-cart.component';
import { CustomerCheckoutComponent } from './Components/customer-checkout/customer-checkout.component';
import { CustomerPaymentComponent } from './Components/customer-payment/customer-payment.component';
import { CustomerOrderconfirmComponent } from './Components/customer-orderconfirm/customer-orderconfirm.component';
import { CartModule } from '../Cart/cart.module';
import { UserModule } from '../User/user.module';
import { PaymentModule } from '../Payment/payment.module';
import { OrderModule } from '../Order/order.module';

@NgModule({
  declarations: [
    CustomertestComponent,
    CustomerComponent,
    CustomerCartComponent,
    CustomerCheckoutComponent,
    CustomerPaymentComponent,
    CustomerOrderconfirmComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AppPublicModule,
    CartModule,
    UserModule,
    PaymentModule,
    OrderModule,
  ],
  exports: [],
})
export class CustomerModule {}
