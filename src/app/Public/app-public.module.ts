import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubAboutComponent } from './PublicComp/pub-about/pub-about.component';
import { PubContactComponent } from './PublicComp/pub-contact/pub-contact.component';
import { PubLoginComponent } from './PublicComp/pub-login/pub-login.component';
import { PubRegisterComponent } from './PublicComp/pub-register/pub-register.component';
import { PubViewprodComponent } from './PublicComp/pub-viewprod/pub-viewprod.component';
import { PubHomeComponent } from './PublicComp/pub-home/pub-home.component';

@NgModule({
  declarations: [
    PubAboutComponent,
    PubContactComponent,
    PubLoginComponent,
    PubRegisterComponent,
    PubViewprodComponent,
    PubHomeComponent,
  ],
  imports: [CommonModule],
  exports: [
    PubAboutComponent,
    PubContactComponent,
    PubLoginComponent,
    PubRegisterComponent,
    PubViewprodComponent,
  ],
})
export class AppPublicModule {}
