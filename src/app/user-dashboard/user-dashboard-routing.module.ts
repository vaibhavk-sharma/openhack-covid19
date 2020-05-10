import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardPage  } from './user-dashboard.page';
import { HomeTabPage } from './home/home.page';

const routes: Routes = [
  {
    path: 'supplier-dashboard',
    component: UserDashboardPage,
    children: [
      {
        path: '',
        component: HomeTabPage
      },
      {
        path: 'home',
        component: HomeTabPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardPageRoutingModule {}
