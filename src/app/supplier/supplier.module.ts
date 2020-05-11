import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupplierPage } from './supplier.page';
import { SupplierPageRoutingModule } from './supplier-routing.module';
import { SupplierHomePage } from './home/home.page';
import { SupplierOrdersPage } from './orders/orders.page';
import { SupplierServicesPage } from './services/services.page';
import { SupplierUpdateStockPage } from './update-stock/update-stock.page';
import { SupplierUpdateServicesPage } from './update-services/update-services.page';
import { AddItemsModal } from '../modals/add-items/add-items.modal';
import { ShowItemsModal } from '../modals/show-items/show-items.modal';
import { ViewBillModal } from '../modals/view-bill/view-bill.modal';

@NgModule({
  declarations: [
    SupplierPage, 
    SupplierHomePage, 
    SupplierOrdersPage, 
    SupplierServicesPage,
    SupplierUpdateStockPage,
    SupplierUpdateServicesPage,
    AddItemsModal,
    ShowItemsModal,
    ViewBillModal
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SupplierPageRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents:[
    AddItemsModal,
    ShowItemsModal,
    ViewBillModal
  ]
})
export class SupplierModule { }
