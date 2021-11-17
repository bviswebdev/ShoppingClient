import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserLoginComponent, UserRegisterComponent],
  imports: [CommonModule, AppMaterialModule, RouterModule, ReactiveFormsModule],
  exports: [UserLoginComponent, UserRegisterComponent],
})
export class UserModule {}
