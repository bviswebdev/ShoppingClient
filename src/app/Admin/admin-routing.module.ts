import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AdmintestComponent } from './Components/admintest/admintest.component';
import { AuthadminGuard } from '../Guards/authadmin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthadminGuard],
    canActivateChild: [AuthadminGuard],
    children: [
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
