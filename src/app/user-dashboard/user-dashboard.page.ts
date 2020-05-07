import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { AdminPage } from '../admin/admin.page';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {

  menu:boolean;
  loggedInUser: any;
  
  constructor(private router: Router, private storage: Storage
    // , public navCtrl: NavController
    ) {
    this.menu=false;
   }

  ngOnInit() {
    this.storage.get('local_community_user').then(data => {
      if(data!=null)
      {
        this.loggedInUser = data[0];
        console.log(JSON.stringify(this.loggedInUser))
      }
    
    })
    .catch(err => {
      console.log(err.message);
    });
    
  }

  openMenu()
  {
    this.menu=true;
  }

  admin(){
    this.storage.set('local_community_user',this.loggedInUser)
    this.router.navigateByUrl('admin');
  }

  logout(){
    this.router.navigateByUrl('home')
  }

  // adminActivity(){
    
  // }

}
