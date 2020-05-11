import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { menuController } from '@ionic/core';
import { OrderService } from 'src/shared/services/order.service';
import { CartPage } from 'src/app/user-dashboard/cart/cart.page'
import { Order,Items } from 'src/shared/models/order.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-essentials',
  templateUrl: './essentials.page.html',
  styleUrls: ['./essentials.page.scss'],
})
export class EssentialsPage {

  supplierList:any;
  order:Order;
  loggedInUser: any;
  itemsList : any;
  flag : boolean;
  supplierId:string;
  cartItem : any;
  constructor(private router: Router, 
    private storage: Storage,
    private toastController: ToastController,
    private orderService: OrderService) {
      this.flag=false;
     }

   ionViewWillEnter() {
    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;
        //console.log(JSON.stringify(this.loggedInUser));
        this.getSupplier();
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

  getSupplier() {
    this.orderService.getSupplier(this.loggedInUser.communityId).subscribe(
      (data) => {
        
        // console.log(JSON.stringify(data))
        if (data != null && data.length > 0) {
          // console.log("YIOEEEEEEE")
          this.supplierList = data;   
        }
        else {
          console.log("No supplier present")
          
        }
      },
      (err) => {
        this.router.navigate(["error"])
        console.log("ERROR OCCURED", err.message, JSON.stringify(err, null, '\t'));
      }
    )
  }

  // To view items related to a particular supplier
  getSupplierItems(event){
    //console.log(event.detail);
    console.log(event.detail.value);
    this.orderService.getSupplierItems(event.detail.value).subscribe(
      (data) => {
        this.supplierId = event.detail.value;
        // console.log(JSON.stringify(data))
        if (data != null && data.length > 0) {
          // console.log("YIOEEEEEEE")
          this.itemsList = data[0].items; 
          console.log(this.itemsList)  
        }
        else {
          /// GENERATE ALERT FOR NO USER IN COMMUNITY
          // let messageObj = {
          //   message : 'Sorry! No Users to View',
          //   status : 'sorry'
          //}
          console.log("No items present for this supplier")
          this.itemsList=[];
          
        }
      },
      (err) => {
        this.router.navigate(["error"])
        console.log("ERROR OCCURED", err.message, JSON.stringify(err, null, '\t'));
      }
    )
  }


//Opening Modal to set the quantity
addToCart(selectedItem){
  this.presentToast();
  let item = new Items();
  item.name = selectedItem.name;
  item.baseUnit = selectedItem.baseUnit;
  item.pricePerUnit = selectedItem.pricePerUnit;
  item.quantity = 1;
  this.cartItem = item;
  console.log(this.cartItem);
  CartPage.cartItems(item,this.supplierId);
}
viewCart(){
  this.router.navigateByUrl('/user-dashboard/cart');
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Item is added to the cart.',
    duration: 1000,
    position: 'middle'
  });
  toast.present();
}


}
