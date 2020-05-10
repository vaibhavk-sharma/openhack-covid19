import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
import { SharedDataService } from 'src/shared/services/shared-data.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage {
  loggedInUser: any;
  menu = false;
  selectedTab = 'home';
  constructor(
    private router: Router,
    private storage: Storage,
    private sharedDataService: SharedDataService,
    private loadingController: LoadingController) { }

  ionViewWillEnter() {
    this.showLoader();
    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;
        this.sharedDataService.UserInfo = this.loggedInUser;
        console.log(JSON.stringify(this.loggedInUser));
      }
    }).catch(err => {
      console.log(err.message);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('orders')) {
          this.selectedTab = 'orders';
        }
        else if (event.url.includes('updateStock')) {
          this.selectedTab = 'updateStock';
        }
        else if (event.url.includes('services')) {
          this.selectedTab = 'services';
        }
        else if (event.url.includes('updateServices')) {
          this.selectedTab = 'updateServices';
        }
        else {
          this.selectedTab = 'home';
        }
      }
    });
  }

  async showLoader() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000
    });

    await loading.present();
  }

  isSupllierServiceProvider(): boolean {
    return this.loggedInUser && this.loggedInUser.subType == 'ServiceProvider';
  }

  openMenu() {
    this.menu = true;
  }

  logout() {
    this.router.navigateByUrl('home')
  }

  onHeaderClick(route: string) {
    this.selectedTab = route;
    this.router.navigateByUrl("supplier-dashboard/" + route);
  }

}
