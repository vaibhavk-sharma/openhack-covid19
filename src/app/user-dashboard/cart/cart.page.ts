import { Component, OnInit } from '@angular/core';
import { order, Items } from 'src/shared/models/order.model';
import { OrderService } from 'src/shared/services/order.service';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(  private formBuilder: FormBuilder) { 
  }

  ngOnInit()
  {
    this.itemList=CartPage.items;
    
  }

  static cartItems(item : any) {
    this.flag=true;
    this.items.push(item);
    console.log(this.items);
  
  }




}
