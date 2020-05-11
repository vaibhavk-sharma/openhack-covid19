import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/shared/services/shared-data.service';
import { SupplierService } from 'src/shared/services/supplier.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AddItemsModal } from 'src/app/modals/add-items/add-items.modal';
import { ItemInfo } from 'src/shared/models/item.model';
import { ShowItemsModal } from 'src/app/modals/show-items/show-items.modal';
import { SupplierItemInfo } from 'src/shared/models/supplier.model';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.page.html',
  styleUrls: ['./update-stock.page.scss'],
})
export class SupplierUpdateStockPage {
  isItemUpdated = false;
  loggedInUser: any;
  supplierInfo: SupplierItemInfo;
  constructor(
    private storage: Storage,
    private sharedDateService: SharedDataService,
    private supplierService: SupplierService,
    private alertController: AlertController,
    private popOverController: PopoverController
  ) { }

  ionViewWillEnter() {
    this.loggedInUser = this.sharedDateService.UserInfo;
    console.log(this.loggedInUser);
    if (this.loggedInUser && this.loggedInUser._id && this.loggedInUser._id != "") {
      this.getSupplierInfo();
    }
    else {
      this.storage.get('local_community_user').then(data => {
        if (data != null) {
          this.loggedInUser = data;
          this.sharedDateService.UserInfo = this.loggedInUser;
          console.log(JSON.stringify(this.loggedInUser));
          this.getSupplierInfo();
        }
      }).catch(err => {
        console.log(err.message);
      });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Unable to process the request currently. Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }

  getSupplierInfo() {
    this.supplierService.GetSupplierInfoBySupplierId(this.loggedInUser._id).subscribe((data) => {
      if (data && data.length > 0) {
        this.supplierInfo = data[0];
      }
      else{
        this.supplierInfo = new SupplierItemInfo;
        this.supplierInfo.items = [];
        this.supplierInfo.supplierId = this.loggedInUser._id;
      }
    },
      (err) => {
        this.presentAlert();
      })
  }


  async newItemClick() {
    const modal = await this.popOverController.create({
      component: AddItemsModal,
      animated: true,
      cssClass: 'contact-popover'
    });
    modal.onWillDismiss().then(returnedData => {
      console.log(returnedData);
      if (returnedData.data && returnedData.data.form && returnedData.data.form.valid && returnedData.data.isSubmitted) {
        if(this.supplierInfo && this.supplierInfo.items){
          this.supplierInfo.items.push(returnedData.data.form.value);
          this.isItemUpdated = true;
        }
        else{
          this.supplierInfo = new SupplierItemInfo;          
          this.supplierInfo.items.push(returnedData.data.form.value);
          this.isItemUpdated = true;
        }        
      }
    });
    return await modal.present();
  }

  async editItemInfo(item: any, index: number) {
    const modal = await this.popOverController.create({
      component: AddItemsModal,
      animated: true,
      cssClass: 'contact-popover',
      componentProps: { item: item }
    });
    modal.onWillDismiss().then(returnedData => {
      console.log(returnedData);
      if (returnedData.data && returnedData.data.form && returnedData.data.form.valid && returnedData.data.isSubmitted) {
        this.supplierInfo.items = this.supplierInfo.items.filter(x => x.name !== item.name);
        this.supplierInfo.items.push(returnedData.data.form.value);
        this.isItemUpdated = true;
      }
    });
    return await modal.present();
  }

  removeItem(item: any) {
    this.supplierInfo.items = this.supplierInfo.items.filter(x => x.name !== item.name);
    if (this.supplierInfo && this.supplierInfo.items && this.supplierInfo.items.length > 0)
      this.isItemUpdated = true;
    else
      this.isItemUpdated = false;
  }

  async showItemInfo(item: any) {
    const modal = await this.popOverController.create({
      component: ShowItemsModal,
      animated: true,
      cssClass: 'contact-popover',
      componentProps: { item: item }
    });
    return await modal.present();
  }

  saveItemChanges(){
    var supplierItemInfo = new SupplierItemInfo();
    supplierItemInfo._id = this.supplierInfo._id;
    supplierItemInfo._rev = this.supplierInfo._rev;
    supplierItemInfo.items = this.supplierInfo.items;
    supplierItemInfo.supplierId = this.loggedInUser._id;
    this.supplierService.SaveSupplierItemInfo(supplierItemInfo).subscribe((data)=>{
      if(data!=null && data._id!="")
        this.isItemUpdated = false;
        this.supplierInfo._id = data._id;
        this.supplierInfo._id = data._revid;
    },
    (err) => {
      this.presentAlert();
    });
  }
}
