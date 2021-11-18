import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AdmintestComponent } from './Components/admintest/admintest.component';
import { AuthadminGuard } from '../Guards/authadmin.guard';
import { PubHomeComponent } from '../Public/PublicComp/pub-home/pub-home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthadminGuard],
    canActivateChild: [AuthadminGuard],
    children: [
      {
        path: '',
        component: PubHomeComponent,
      },
      {
        path: 'test',
        component: AdmintestComponent,
      },
      {
        path: 'create',
        component: AdmintestComponent,
      },
      {
        path: 'update',
        component: AdmintestComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
