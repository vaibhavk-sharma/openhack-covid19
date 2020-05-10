import { Component, OnInit } from '@angular/core';
import { order } from 'src/shared/models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  order: any = [];

  constructor() { }

  ngOnInit() {
  }

  static cartItems(item : any) {
    
    console.log(JSON.stringify(item));
  }

}
