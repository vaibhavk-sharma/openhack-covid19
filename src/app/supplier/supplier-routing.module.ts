import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierPage  } from './supplier.page';
import { SupplierHomePage } from './home/home.page';
import { SupplierOrdersPage } from './orders/orders.page';
import { SupplierServicesPage } from './services/services.page';
import { SupplierUpdateStockPage } from './update-stock/update-stock.page';
import { SupplierUpdateServicesPage } from './update-services/update-services.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierPage,
    children:[
      {
        path: '',
        component: SupplierHomePage
      },
      {
        path: 'home',
        component: SupplierHomePage
      },
      {
        path: 'orders',
        component: SupplierOrdersPage
      },
      {
        path: 'services',
        component: SupplierServicesPage
      },
      {
        path: 'updateStock',
        component: SupplierUpdateStockPage
      },
      {
        path: 'updateServices',
        component: SupplierUpdateServicesPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierPageRoutingModule {}
