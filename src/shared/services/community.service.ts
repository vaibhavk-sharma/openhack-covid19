import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../constants';
import { RegisterCommunityInput } from '../models/community.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  FilterBySearchTerm(searchTerm: string): Observable<any>{
    return this.http.post(ApiRoutes.FilterCommunityBySearchTerm,{ searchTerm: searchTerm });
  }

  registerCommunity(community: RegisterCommunityInput): Observable<any>{
    return this.http.post(ApiRoutes.RegisterCommunity,community);
  }
}
