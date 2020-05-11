import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../constants';
import { GetOrdersInput } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  GetOrdersByStatus(input: GetOrdersInput): Observable<any>{
    return this.http.post(ApiRoutes.GetOrders,input);
  }

  UpdateOrderStatus(input: any): Observable<any>{
    return this.http.post(ApiRoutes.UpdateOrderStatus,input);
  }
}
