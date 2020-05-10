import { Component, OnInit } from '@angular/core';
import { order, Items } from 'src/shared/models/order.model';
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

  private  order: order[];
  static items : Items[] = [];
  flag=false;
  static flag: boolean;
  itemList : Items[] =[];
  loggedInUser: any;

  constructor(  private formBuilder: FormBuilder,private router: Router,
    private storage: Storage) { 
  }

  ngOnInit()
  {
    this.itemList=CartPage.items;

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

  static cartItems(item : any) {
    this.flag=true;
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
