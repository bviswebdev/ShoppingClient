import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubAboutComponent } from './PublicComp/pub-about/pub-about.component';
import { PubContactComponent } from './PublicComp/pub-contact/pub-contact.component';
import { PubLoginComponent } from './PublicComp/pub-login/pub-login.component';
import { PubRegisterComponent } from './PublicComp/pub-register/pub-register.component';
import { PubViewprodComponent } from './PublicComp/pub-viewprod/pub-viewprod.component';
import { PubHomeComponent } from './PublicComp/pub-home/pub-home.component';
import { AppMaterialModule } from '../app-material.module';
import { AppSharedModule } from '../Shared/app-shared.module';
import { ProductModule } from '../Product/product.module';
import { PubProddetailComponent } from './PublicComp/pub-proddetail/pub-proddetail.component';

@NgModule({
  declarations: [
    PubAboutComponent,
    PubContactComponent,
    PubLoginComponent,
    PubRegisterComponent,
    PubViewprodComponent,
    PubHomeComponent,
    PubProddetailComponent,
  ],
  imports: [CommonModule, AppMaterialModule, ProductModule],
  exports: [
    PubAboutComponent,
    PubContactComponent,
    PubLoginComponent,
    PubRegisterComponent,
    PubViewprodComponent,
    PubProddetailComponent,
  ],
})
export class AppPublicModule {}
