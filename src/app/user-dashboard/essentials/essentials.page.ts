import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { menuController } from '@ionic/core';

@Component({
  selector: 'app-essentials',
  templateUrl: './essentials.page.html',
  styleUrls: ['./essentials.page.scss'],
})
export class EssentialsPage implements OnInit {

  supplierList:any;
  loggedInUser: any;
  constructor(private router: Router, 
    private storage: Storage) {
      
     }

  ngOnInit() {
    this.supplierList=["Sukriti","Vinay","Shruti"];
    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;
        console.log(JSON.stringify(this.loggedInUser));
       
      }

    }).catch(err => {
      console.log(err.message);
    });
  }


  async openMenu() {
    await menuController.close();
    await menuController.open();
   console.log(menuController.getOpen())
  }

  admin() {
    this.storage.set('local_community_user', this.loggedInUser)
    this.router.navigateByUrl('admin');
  }

  logout() {
    this.router.navigateByUrl('home')
  }

  customPopoverOptions: any = {
    header: 'Select a supplier to view available items'
  };

  viewItems(supplierName)
  {
    console.log(supplierName);
  }
}
