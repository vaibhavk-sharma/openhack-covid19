import { Component, OnInit } from '@angular/core';
import { Order, Items } from 'src/shared/models/order.model';
import { OrderService } from 'src/shared/services/order.service';
import { FormBuilder, Validators } from '@angular/forms';
import { menuController } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  private order: Order;
  static items: Items[] = [];
  flag = false;
  static flag: boolean;
  itemList: Items[] = [];
  static supplierId: string;
  supplier_Id:string;
  successMessage:string;
  loggedInUser:any;

  constructor(  private formBuilder: FormBuilder,private router: Router,
    private storage: Storage,private orderService:OrderService) { 
  }

  ngOnInit()
  {
    this.itemList=CartPage.items;
    this.supplier_Id = CartPage.supplierId;

    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;
        //console.log(JSON.stringify(this.loggedInUser))
      }
    })
      .catch(err => {
        console.log(err.message);
      });
  }
    
createPost(order){
  this.order.items = this.itemList;
  this.order.supplierId = this.supplier_Id;
  this.order.residentId = this.loggedInUser.residentId;
  this.orderService.createOrder(order).subscribe((data) => {
    this.successMessage = data.message;
    this.itemList =[];
  })
}
  

  static cartItems(item: any,supplierId: string) {
    this.flag = true;
    this.supplierId = supplierId;
    this.items.push(item);    
    console.log(this.items);
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




}
