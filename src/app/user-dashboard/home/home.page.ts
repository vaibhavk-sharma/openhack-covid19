import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { menuController } from '@ionic/core';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomeTabPage implements OnInit {

  
  loggedInUser: any;
  constructor(
    private alertController: AlertController,
    private router: Router, 
    private storage: Storage) {
      
     }

  ngOnInit() {
  
    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;
        //console.log(JSON.stringify(this.loggedInUser));
        if(this.loggedInUser && !this.loggedInUser.isUserVerified && !this.loggedInUser.isAdmin){
          this.showUserVerifiedAlert();
        }
      }

    }).catch(err => {
      console.log(err.message);
    });
  }

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };

   async openMenu() {
    await menuController.open();
  }

  admin() {
    this.storage.set('local_community_user', this.loggedInUser)
    this.router.navigateByUrl('admin');
  }

  logout() {
    this.router.navigateByUrl('home')
  }

  async showUserVerifiedAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'You are not verified yet. Please try again later.',
      buttons: ['OK']
    });

    await alert.present();
    
    this.logout();
  }
}

