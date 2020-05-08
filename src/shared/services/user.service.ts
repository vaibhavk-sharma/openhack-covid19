import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findUserbyEmailId(emailId: string): Observable<any>{
    return this.http.post(ApiRoutes.FindUserByEmail,{ emailId: emailId });
  }

  registerUser(user: User): Observable<any>{
    return this.http.post(ApiRoutes.RegisterUser,user);
  }

  getAllUsers(communityId: string): Observable<any> {
    return this.http.post(ApiRoutes.GetAllUsers, { communityId: communityId });
  }

  updateUserAsVerified(user:User): Observable<any> {
    return this.http.post(ApiRoutes.UpdateUserAsVerified, user);
  }

  deleteRejectedUser(user:User): Observable<any> {
    return this.http.post(ApiRoutes.DeleteRejectedUser, user);
  }

}
