import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NativeUserStorageInfo } from '../models/user.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
    providedIn: 'root'
})
export class UserInfoResolver implements Resolve<NativeUserStorageInfo> {
    constructor(private nativeStorage: NativeStorage) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<NativeUserStorageInfo> {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('community_user')
                .then((data) => {
                    resolve(data);
                }, (error) => {
                    resolve(null);
                })
        });

    }
}