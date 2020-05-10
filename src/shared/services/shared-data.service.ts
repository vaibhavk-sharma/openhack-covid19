import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  userInfo: any;
  constructor() { }

  get UserInfo(){
    return this.userInfo;
  }

  set UserInfo(user){
    this.userInfo = user;
  }
}
