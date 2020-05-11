import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { ItemInfo } from 'src/shared/models/item.model';
import { OrderStatus } from 'src/shared/constants';
@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.html',
  styleUrls: ['./view-bill.scss']
})
export class ViewBillModal{
  order: any;
  isSubmitted: boolean;
  isEdit: boolean = false;  
  updateditemIndex : number;
  updatedItems: any;
  constructor(private formBuilder: FormBuilder,private popOverController: PopoverController) {}

  ionViewWillEnter() {
    if(this.order && this.order.items && this.order.items.length > 0){
      this.updatedItems = this.order.items;
    }
  }

  editItemInfo(item: any,index: any){
     this.isEdit = true;     
     this.updatedItems[index].quantity = item.quantity;
     this.order.items[index].quantity = item.quantity;
  }

  saveItemInfo(item: any,index: any){
    this.isEdit = false;
    this.updatedItems[index].quantity = item.quantity;
    this.order.items[index].quantity = item.quantity;
    var totalBill = 0;
    this.order.items.forEach(item => {
      totalBill += item.pricePerUnit * item.quantity;
    })
    this.order.totalBill = totalBill;
  }

  confirmStatus(){
    this.order.status = OrderStatus.Confirmed;
    this.popOverController.dismiss({ order: this.order });
  }

  notConfirmStatus(){
    this.order.status = OrderStatus.NotConfirmed;
    this.popOverController.dismiss({ order: this.order });
  }

  verifyPayment(){
    this.order.status = OrderStatus.OutForDelivery;
    this.popOverController.dismiss({ order: this.order });
  }
}