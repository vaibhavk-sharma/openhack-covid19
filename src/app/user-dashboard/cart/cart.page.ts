import { Component, OnInit } from '@angular/core';
import { Order, Items } from 'src/shared/models/order.model';
import { OrderService } from 'src/shared/services/order.service';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {
  }

  ngOnInit() {
    this.itemList = CartPage.items;
    this.supplier_Id = CartPage.supplierId;

  }
  createOrder(order){
    this.order.items = this.itemList;
    this.order.supplierId = this.supplier_Id;
    this.orderService.createOrder(this.order).subscribe(
      (data) => {
        this.successMessage = data.message;
        this.itemList=[];
      }
    )
  }
  

  static cartItems(item: any,supplierId: string) {
    this.flag = true;
    this.supplierId = supplierId;
    this.items.push(item);    
    console.log(this.items);
  }




}
