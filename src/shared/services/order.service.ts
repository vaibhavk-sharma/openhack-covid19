import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

    getSupplier(communityId: string): Observable<any> {
    return this.http.post(ApiRoutes.GetSupplier, { communityId: communityId });
    }

    getSupplierItems(communityId: string): Observable<any> {
        return this.http.post(ApiRoutes.GetSupplierItems, { communityId: communityId });
  }

  createOrder(communityId: string): Observable<any> {
    return this.http.post(ApiRoutes.CreateOrder, { communityId: communityId });
}

 
}
