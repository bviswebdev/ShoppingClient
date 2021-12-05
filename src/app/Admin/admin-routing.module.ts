import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AdmintestComponent } from './Components/admintest/admintest.component';
import { AuthadminGuard } from '../Guards/authadmin.guard';
import { PubHomeComponent } from '../Public/PublicComp/pub-home/pub-home.component';
import { AdminProductaddComponent } from './Components/admin-productadd/admin-productadd.component';
import { AdminProductupdateComponent } from './Components/admin-productupdate/admin-productupdate.component';
import { AppNotfoundComponent } from '../Shared/ComponentGlobals/app-notfound/app-notfound.component';

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
        path: 'add',
        component: AdminProductaddComponent,
      },
      {
        path: 'update',
        children: [
          { path: '', component: AppNotfoundComponent },
          {
            path: ':productId',
            component: AdminProductupdateComponent,
          },
        ],
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
