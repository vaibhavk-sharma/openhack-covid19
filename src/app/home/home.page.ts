import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NativeUserStorageInfo } from 'src/shared/models/user.model';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    private userService: UserService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: NativeUserStorageInfo) => {
        if (data != null && data.idToken != null) {
          this.router.navigate(['secured/home'])
        }
      });
  }

  doGoogleLogin() {

    // this.googlePlus.login({
    //   'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    //   'webClientId': '596708425506-hb5amal386g9t7t10mght08hovkeo5m0.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    //   'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    // })
    //   .then(user => {
    //     this.user = user;
        this.user = {
          name: "George Maharis",
          email: "George_Maharis@infosys.com",
          token: "hb5amal386g9t7t10mght08hovkeo5m0"
        };
        this.userService.findUserbyEmailId(this.user.email).subscribe(
          (data) => {
            if (data != null && data.length>0) {
              this.user._id = data[0]._id;
              this.user._revId = data[0]._revId;
              this.nativeStorageUpdate(this.user);
            }
            else {
              this.storage.set('local_community_user', this.user);
              this.router.navigate(["register"]);
            }
          },
          (err) => {
            this.router.navigate(["error"])
          }
        )
      // }, err => {
      //   console.log(err);
      // })
  }

  nativeStorageUpdate(user: any) {
    //save user data on the native storage
    this.nativeStorage.setItem('community_user', {
      name: user.displayName,
      email: user.email,
      token: user.idToken
    })
      .then(() => {
        console.log('native storage updated');
      }, (error) => {
        console.log(error);
      })
  }
}
