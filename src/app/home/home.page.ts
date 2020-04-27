import { Component, ViewChild} from '@angular/core';
import {IonSlides } from '@ionic/angular'; 
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage) { }
  user:any
  async doGoogleLogin(){
    console.log('Device is ready!');
    this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '596708425506-hb5amal386g9t7t10mght08hovkeo5m0.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user => {
        this.user=user;
        console.log( user);
        //save user data on the native storage

        // this.nativeStorage.setItem('google_user', {
        //   name: user.displayName,
        //   email: user.email,
        //   picture: user.imageUrl
        // })
        // .then(() => {
        //    console.log('native storage updated');
        // }, (error) => {
        //   console.log(error);
        // })
      }, err => {
        console.log(err);       
      })
  }
}
