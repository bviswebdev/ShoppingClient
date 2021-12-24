import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthadminGuard } from './Guards/authadmin.guard';
import { AuthcustomerGuard } from './Guards/authcustomer.guard';
import { AuthregisterGuard } from './Guards/authregister.guard';
import { AppContentComponent } from './Layout/app-content/app-content.component';
import { AppMedicareComponent } from './Layout/app-medicare/app-medicare.component';
import { AppPublicModule } from './Public/app-public.module';
import { PubAboutComponent } from './Public/PublicComp/pub-about/pub-about.component';
import { PubContactComponent } from './Public/PublicComp/pub-contact/pub-contact.component';
import { PubHomeComponent } from './Public/PublicComp/pub-home/pub-home.component';
import { PubLoginComponent } from './Public/PublicComp/pub-login/pub-login.component';
import { PubProddetailComponent } from './Public/PublicComp/pub-proddetail/pub-proddetail.component';
import { PubProductsComponent } from './Public/PublicComp/pub-products/pub-products.component';
import { PubRegisterComponent } from './Public/PublicComp/pub-register/pub-register.component';
import { PubViewprodComponent } from './Public/PublicComp/pub-viewprod/pub-viewprod.component';
import { AppSharedModule } from './Shared/app-shared.module';
import { AppErrorComponent } from './Shared/ComponentGlobals/app-error/app-error.component';
import { AppNotfoundComponent } from './Shared/ComponentGlobals/app-notfound/app-notfound.component';

const routes: Routes = [
  {
    path: 'medicare',
    component: AppContentComponent,
    data: {
      breadcrumb: 'Home',
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: PubHomeComponent,
      },
      {
        path: 'aboutus',
        component: PubAboutComponent,
        data: {
          breadcrumb: 'Aboutus',
        },
      },
      {
        path: 'contactus',
        component: PubContactComponent,
        data: {
          breadcrumb: 'Contactus',
        },
      },
      {
        path: 'viewproducts',
        data: {
          breadcrumb: 'Products',
        },
        children: [
          {
            path: '',
            component: PubViewprodComponent,
          },
          {
            path: 'category',
            data: {
              breadcrumb: 'Category',
            },
            children: [
              { path: '', component: PubViewprodComponent },
              {
                path: ':categoryId',
                component: PubViewprodComponent,
                data: {
                  breadcrumb: '',
                  breadcrumbkey: 'category',
                },
              },
            ],
          },
          {
            path: 'product',
            data: {
              breadcrumb: 'Product',
            },
            children: [
              { path: '', component: PubViewprodComponent },
              {
                path: ':productId',
                component: PubProddetailComponent,
                data: {
                  breadcrumb: '',
                  breadcrumbkey: 'product',
                },
              },
            ],
          },
        ],
      },
      {
        path: 'register',
        component: PubRegisterComponent,
        canActivate: [AuthregisterGuard],
        data: {
          breadcrumb: 'Register',
        },
      },
      {
        path: 'signin',
        component: PubLoginComponent,
        canActivate: [AuthregisterGuard],
        data: {
          breadcrumb: 'Login',
        },
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./Admin/admin.module').then((mod) => mod.AdminModule),
    canLoad: [AuthadminGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./Customer/customer.module').then((mod) => mod.CustomerModule),
    canLoad: [AuthcustomerGuard],
  },
  { path: 'apperror', component: AppErrorComponent },
  { path: '', redirectTo: '/medicare/home', pathMatch: 'full' },
  { path: '**', component: AppNotfoundComponent },
];

/*
const routes: Routes = [
  {
    path: 'home',
    component: PubHomeComponent,
  },
  {
    path: 'aboutus',
    component: PubAboutComponent,
  },
  {
    path: 'contactus',
    component: PubContactComponent,
  },
  {
    path: 'view-prod/category/:categoryId',
    component: PubViewprodComponent,
    data: {
      title: 'Category',
      breadcrumb: [
        {
          label: 'Home',
          url: '/Home',
        },
        {
          label: 'ViewProducts',
          url: '/view-prod',
        },
        {
          label: '{{dynamicText}} category',
          url: '',
        },
      ],
    },
  },
  {
    path: 'view-prod/product/:productId',
    component: PubProddetailComponent,
    data: {
      title: 'Product',
      breadcrumb: [
        {
          label: 'Home',
          url: '/Home',
        },
        {
          label: 'ViewProducts',
          url: '/view-prod',
        },
        {
          label: '{{customText}} product',
          url: '',
        },
      ],
    },
  },
  {
    path: 'view-prod',
    component: PubViewprodComponent,
    data: {
      title: 'ViewProducts',
      breadcrumb: [
        {
          label: 'Home',
          url: '/Home',
        },
        {
          label: 'ViewProducts',
          url: '',
        },
      ],
    },
  },
  {
    path: 'register',
    component: PubRegisterComponent,
  },
  {
    path: 'signin',
    component: PubLoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./Admin/admin.module').then((mod) => mod.AdminModule),
    canLoad: [AuthadminGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./Customer/customer.module').then((mod) => mod.CustomerModule),
    canLoad: [AuthcustomerGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: AppNotfoundComponent },
];*/

@NgModule({
  imports: [AppPublicModule, AppSharedModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
