import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardPage  } from './user-dashboard.page';
import { HomeTabPage } from './home/home.page';
import { EssentialsPage } from './essentials/essentials.page';
import { ForumPage } from './forum/forum.page';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardPage,
    children: [
      {
        path: '',
        component: HomeTabPage
      },
      {
        path: 'home',
        component: HomeTabPage
      },
      {
        path: 'essentials',
        component: EssentialsPage
      },
      {
        path: 'forum',
        component: ForumPage
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardPageRoutingModule {}
