import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent } from './front-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      //   {
      //     path: 'users',
      //     loadChildren: () =>
      //       import('./users/users.module').then((m) => m.UsersModule),
      //     canActivate: [AuthGuard],
      //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontPageRoutingModule {}
