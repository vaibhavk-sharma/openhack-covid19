import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GetOrdersInput } from 'src/shared/models/orders.model';
import { OrdersService } from 'src/shared/services/orders.service';
import { OrderStatus } from 'src/shared/constants';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class SupplierHomePage {

  orders = [];
  loggedInUser: any;
  initiatedCount = 0;
  cancelledCount = 0;
  completedCount = 0;
  @ViewChild('ion-header', { static: false }) header: any;
  constructor(
    private orderService: OrdersService,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage) { }

  ionViewWillEnter() {
    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;        
        this.getInitiatedOrders();
      }
    }).catch(err => {
      console.log(err.message);
    });
  }

  navigateExternal(route: string) {
    this.router.navigateByUrl('/supplier-dashboard/' + route);
  }

  getInitiatedOrders(){
    let orderInput = new GetOrdersInput();
    orderInput.supplierId = this.loggedInUser._id;
    this.orderService.GetOrdersByStatus(orderInput).subscribe((orders)=>{
      if(orders && orders.length > 0){
        this.orders = orders;
        this.initiatedCount = this.orders.filter(x=>x.status == OrderStatus.Initiated).length;
        this.completedCount = this.orders.filter(x=>x.status == OrderStatus.Completed).length;
        this.cancelledCount = this.orders.filter(x=>x.status == OrderStatus.Cancelled).length;
      }    
    },
    (err)=>{})
  }

}
