import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/shared/services/orders.service';
import { OrderStatus } from 'src/shared/constants';
import { SharedDataService } from 'src/shared/services/shared-data.service';
import { Storage } from '@ionic/storage';
import { GetOrdersInput } from 'src/shared/models/orders.model';
import { AlertController, PopoverController } from '@ionic/angular';
import { ViewBillModal } from 'src/app/modals/view-bill/view-bill.modal';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class SupplierOrdersPage {
  loggedInUser: any;
  initializedOrders= [];
  completedOrders= [];
  paymentInitiatedOrders= [];
  orderStatus = OrderStatus.Initiated;
  constructor(
    private orderService: OrdersService,
    private sharedDateService: SharedDataService,
    private storage: Storage,
    private alertController: AlertController,
    private popOverController: PopoverController
    ) { }

  ionViewWillEnter() {
    this.loggedInUser = this.sharedDateService.UserInfo;
    if (this.loggedInUser && this.loggedInUser._id && this.loggedInUser._id != "") {
      this.getInitiatedOrders(OrderStatus.Initiated);
    }
    else {
      this.storage.get('local_community_user').then(data => {
        if (data != null) {
          this.loggedInUser = data;
          this.sharedDateService.UserInfo = this.loggedInUser;
          console.log(JSON.stringify(this.loggedInUser));
          this.getInitiatedOrders(OrderStatus.Initiated);
        }
      }).catch(err => {
        console.log(err.message);
      });
    }

  }

  selectOrderStatus(){
    if(this.orderStatus == OrderStatus.Initiated){
      this.getInitiatedOrders(OrderStatus.Initiated);
    }
    else if(this.orderStatus == OrderStatus.PaymentInitiated){
      this.getPaymentInitiatedOrders(OrderStatus.PaymentInitiated);
    }
  }

  getInitiatedOrders(orderStatus: OrderStatus){
    let orderInput = new GetOrdersInput();
    orderInput.status = orderStatus;
    orderInput.supplierId = this.loggedInUser._id;
    this.orderService.GetOrdersByStatus(orderInput).subscribe((orders)=>{
      if(orders && orders.length > 0){
        let totalBill = 0;
        orders.forEach(order => {
          order.items.forEach(item => {
            totalBill += item.pricePerUnit * item.quantity;
          })
          order.totalBill = totalBill;
        });
        this.initializedOrders = orders;
      }
      else{
        this.presentOrderEmptyAlert(OrderStatus.Initiated)
      }      
    },
    (err)=>{
      this.presentAlert();
    })
  }

  getPaymentInitiatedOrders(orderStatus: OrderStatus){
    let orderInput = new GetOrdersInput();
    orderInput.status = orderStatus;
    orderInput.supplierId = this.loggedInUser._id;
    this.orderService.GetOrdersByStatus(orderInput).subscribe((orders)=>{
      if(orders && orders.length > 0){
        let totalBill = 0;
        orders.forEach(order => {
          order.items.forEach(item => {
            totalBill += item.pricePerUnit * item.quantity;
          })
          order.totalBill = totalBill;
        });
        this.paymentInitiatedOrders = orders;
      }
      else{
        this.presentOrderEmptyAlert(OrderStatus.PaymentInitiated)
      }      
    },
    (err)=>{
      this.presentAlert();
    })
  }

  async presentOrderEmptyAlert(status: OrderStatus) {
    let message = "You don't have any " + status + " orders.";
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Unable to process the request currently. Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }

  async viewBillDetails(order: any,index: any){
    const modal = await this.popOverController.create({
      component: ViewBillModal,
      animated: true,
      cssClass: 'contact-popover',
      componentProps: { order: order }
    });
    modal.onWillDismiss().then(returnedData => {
      if (returnedData.data && returnedData.data.order) {
        this.initializedOrders[index].status = returnedData.data.order.status;
        this.initializedOrders[index].items = returnedData.data.order.items;        
        this.orderService.UpdateOrderStatus(this.initializedOrders[index]).subscribe((data)=>{
          this.initializedOrders[index]._rev = data._revId;
          this.initializedOrders = this.initializedOrders.filter(x=>x.status == OrderStatus.Initiated);
        },
        (err)=> {
          this.presentAlert();
        })
      }
    });
    return await modal.present();
  }

  async verifyBillDetails(order: any,index: any){
    const modal = await this.popOverController.create({
      component: ViewBillModal,
      animated: true,
      cssClass: 'contact-popover',
      componentProps: { order: order }
    });
    modal.onWillDismiss().then(returnedData => {
      if (returnedData.data && returnedData.data.order) {
        this.paymentInitiatedOrders[index].status = returnedData.data.order.status;
        this.paymentInitiatedOrders[index].items = returnedData.data.order.items;        
        this.orderService.UpdateOrderStatus(this.paymentInitiatedOrders[index]).subscribe((data)=>{
          this.paymentInitiatedOrders[index]._rev = data._revId;
          this.paymentInitiatedOrders = this.paymentInitiatedOrders.filter(x=>x.status == OrderStatus.PaymentInitiated);
        },
        (err)=> {
          this.presentAlert();
        })
      }
    });
    return await modal.present();
  }

}
