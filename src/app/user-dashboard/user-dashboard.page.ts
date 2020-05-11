import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { AdminPage } from '../admin/admin.page';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage {

  menu:boolean;
  loggedInUser: any;
  
  constructor(private router: Router, private storage: Storage
    ) {
    this.menu=false;
   }

   ionViewWillEnter() {
    this.storage.get('local_community_user').then(data => {
      if(data!=null)
      {
        this.loggedInUser = data;
        console.log(JSON.stringify(this.loggedInUser))
      }
    
    })
    .catch(err => {
      console.log(err.message);
    });
    
  }

}
