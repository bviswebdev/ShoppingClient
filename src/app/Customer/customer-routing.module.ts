import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './Components/customer/customer.component';
import { CustomertestComponent } from './Components/customertest/customertest.component';
import { AuthcustomerGuard } from '../Guards/authcustomer.guard';
import { PubHomeComponent } from '../Public/PublicComp/pub-home/pub-home.component';

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
        path: 'create',
        component: CustomertestComponent,
      },
      {
        path: 'update',
        component: CustomertestComponent,
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
