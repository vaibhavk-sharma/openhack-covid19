import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDashboardPageRoutingModule } from './user-dashboard-routing.module';

import { UserDashboardPage } from './user-dashboard.page';
import { HomeTabPage } from './home/home.page';
import { EssentialsPage } from './essentials/essentials.page';
import { ForumPage } from './forum/forum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDashboardPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserDashboardPage, HomeTabPage,EssentialsPage,ForumPage]
})
export class UserDashboardPageModule {}
