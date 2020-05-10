import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class SupplierHomePage {

  loggedInUser: any;
  @ViewChild('ion-header', { static: false }) header: any;
  constructor(
    private alertController: AlertController,
    private router: Router,
    private storage: Storage) { }

  ionViewWillEnter() {
    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;
        console.log(JSON.stringify(this.loggedInUser));
      }

    }).catch(err => {
      console.log(err.message);
    });
  }

  navigateExternal(route: string) {
    this.router.navigateByUrl('/supplier-dashboard/' + route);
  }

}
