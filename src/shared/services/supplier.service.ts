import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../constants';
import { SupplierItemInfo } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  GetSupplierInfoBySupplierId(supplierId: string): Observable<any>{
    return this.http.post(ApiRoutes.GetSupplierInfoBySupplierId,{ supplierId: supplierId });
  }

  SaveSupplierItemInfo(supplierItemInfo: SupplierItemInfo): Observable<any>{
    return this.http.post(ApiRoutes.SaveSupplierItemInfo,supplierItemInfo);
  }
}
