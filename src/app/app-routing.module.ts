import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPublicModule } from './Public/app-public.module';
import { PubAboutComponent } from './Public/PublicComp/pub-about/pub-about.component';
import { PubContactComponent } from './Public/PublicComp/pub-contact/pub-contact.component';
import { PubHomeComponent } from './Public/PublicComp/pub-home/pub-home.component';
import { PubLoginComponent } from './Public/PublicComp/pub-login/pub-login.component';
import { PubRegisterComponent } from './Public/PublicComp/pub-register/pub-register.component';
import { PubViewprodComponent } from './Public/PublicComp/pub-viewprod/pub-viewprod.component';
import { AppSharedModule } from './SharedModules/app-shared.module';
import { AppNotfoundComponent } from './SharedModules/ComponentGlobals/app-notfound/app-notfound.component';

const routes: Routes = [
  { path: 'home', component: PubHomeComponent },
  { path: 'aboutus', component: PubAboutComponent },
  { path: 'contactus', component: PubContactComponent },
  { path: 'viewpub-prod', component: PubViewprodComponent },
  { path: 'register', component: PubRegisterComponent },
  { path: 'signin', component: PubLoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: AppNotfoundComponent },
];

@NgModule({
  imports: [AppPublicModule, AppSharedModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
