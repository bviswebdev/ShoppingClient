import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAddressComponent } from './Components/user-address/user-address.component';
import { UserConfirmComponent } from './Components/user-confirm/user-confirm.component';
import { UserWelcomeComponent } from './Components/user-welcome/user-welcome.component';
import { UserSignupComponent } from './Components/user-signup/user-signup.component';
import { UserAddressCheckoutComponent } from './Components/user-address-checkout/user-address-checkout.component';
import { UserSnackComponent } from './Components/user-snack/user-snack.component';
import { OrderModule } from '../Order/order.module';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserAddressComponent,
    UserConfirmComponent,
    UserWelcomeComponent,
    UserSignupComponent,
    UserAddressCheckoutComponent,
    UserSnackComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    OrderModule,
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent,
    UserAddressComponent,
    UserConfirmComponent,
    UserWelcomeComponent,
    UserSignupComponent,
    UserAddressCheckoutComponent,
  ],
})
export class UserModule {}
