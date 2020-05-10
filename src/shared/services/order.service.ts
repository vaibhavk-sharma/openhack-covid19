import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../constants';
import { order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

    getSupplier(communityId: string): Observable<any> {
    return this.http.post(ApiRoutes.GetSupplier, { communityId: communityId });
    }

    getSupplierItems(supplierId: string): Observable<any> {
        return this.http.post(ApiRoutes.GetSupplierItems, { supplierId: supplierId });
  }

  createOrder(order: order): Observable<any> {
    return this.http.post(ApiRoutes.CreateOrder, { order: order });
}

 
}
