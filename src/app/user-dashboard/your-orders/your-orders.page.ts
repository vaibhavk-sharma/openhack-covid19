import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { OrderStatus } from 'src/shared/constants';
import { GetOrdersInput } from 'src/shared/models/orders.model';
import { OrdersService } from 'src/shared/services/orders.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { InitiatePaymentModal } from 'src/app/modals/initiate-payment/initiate-payment.modal';
import { ViewOrderModal } from 'src/app/modals/view-order/view-order.modal';

@Component({
  selector: 'app-your-orders',
  templateUrl: './your-orders.page.html',
  styleUrls: ['./your-orders.page.scss'],
})
export class YourOrdersPage {
  loggedInUser: any;
  confirmedOrders = [];
  notConfirmedOrders = [];
  orderStatus = OrderStatus.Confirmed;
  constructor(
    private storage: Storage,
    private orderService: OrdersService,
    private alertController: AlertController,
    private popOverController: PopoverController
  ) { }

  ionViewWillEnter() {

    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;
        this.getConfirmedOrders(OrderStatus.Confirmed);
      }
    })
      .catch(err => {
        console.log(err.message);
      });
  }

  selectOrderStatus() {
    if (this.orderStatus == OrderStatus.Confirmed) {
      this.getConfirmedOrders(OrderStatus.Confirmed);
    }
    else if (this.orderStatus == OrderStatus.NotConfirmed) {
      this.getNotConfirmedOrders(OrderStatus.NotConfirmed);
    }
  }

  getConfirmedOrders(orderStatus: OrderStatus) {
    let orderInput = new GetOrdersInput();
    orderInput.status = orderStatus;
    orderInput.residentId = this.loggedInUser._id;
    this.orderService.GetOrdersByStatus(orderInput).subscribe((orders) => {
      if (orders && orders.length > 0) {
        this.confirmedOrders = orders;
      }
    },
      (err) => {
        this.presentAlert();
      })
  }

  getNotConfirmedOrders(orderStatus: OrderStatus) {
    let orderInput = new GetOrdersInput();
    orderInput.status = orderStatus;
    orderInput.residentId = this.loggedInUser._id;
    this.orderService.GetOrdersByStatus(orderInput).subscribe((orders) => {
      if (orders && orders.length > 0) {
        this.notConfirmedOrders = orders;
      }
    },
      (err) => {
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

  async initiatepayment(order: any, index: any) {
    const modal = await this.popOverController.create({
      component: InitiatePaymentModal,
      animated: true,
      cssClass: 'contact-popover'
    });
    modal.onWillDismiss().then(returnedData => {
      if (returnedData.data && returnedData.data.form && returnedData.data.form.transactionId) {
        this.confirmedOrders[index].status = OrderStatus.PaymentInitiated;
        this.confirmedOrders[index].transactionId = returnedData.data.transactionId;
        this.orderService.UpdateOrderStatus(this.confirmedOrders[index]).subscribe((data) => {
          this.confirmedOrders[index]._rev = data._revId;
          this.confirmedOrders = this.confirmedOrders.filter(x => x.status == OrderStatus.Confirmed);
        },
          (err) => {
            this.presentAlert();
          })
      }
    });
    return await modal.present();
  }

  async viewOrderInfo(order: any, index: any) {
    const modal = await this.popOverController.create({
      component: ViewOrderModal,
      animated: true,
      cssClass: 'contact-popover',
      componentProps: { order: order }
    });
    modal.onWillDismiss().then(returnedData => { });
    return await modal.present();
  }

  acceptOrderChange(order: any, index: any) {
    this.notConfirmedOrders[index].status = OrderStatus.Initiated;
    this.orderService.UpdateOrderStatus(this.notConfirmedOrders[index]).subscribe((data) => {
      this.notConfirmedOrders[index]._rev = data._revId;
      this.notConfirmedOrders = this.notConfirmedOrders.filter(x => x.status == OrderStatus.NotConfirmed);
    },
      (err) => {
        this.presentAlert();
      })
  }

  rejectOrderChange(order: any, index: any) {
    this.notConfirmedOrders[index].status = OrderStatus.PaymentInitiated;
    this.orderService.UpdateOrderStatus(this.confirmedOrders[index]).subscribe((data) => {
      this.confirmedOrders[index]._rev = data._revId;
      this.notConfirmedOrders = this.notConfirmedOrders.filter(x => x.status == OrderStatus.NotConfirmed);
    },
      (err) => {
        this.presentAlert();
      })
  }
}
