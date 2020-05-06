import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/user.service';
import { Storage } from '@ionic/storage';
// import { NavParams } from 'ionic-angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  admin: any;
  unverifiedUserList : any;


  constructor(private router: Router,
    private storage: Storage,
    private userService: UserService,
    // public navCtrl: NavController,
    // public navParams: NavParams
    ) {
      // this.user = navParams.get('incomingUser');
     }

  ngOnInit() {
    console.log(JSON.stringify(this.admin));
    //GOT data from local_community_user to store in user
    this.storage.get('local_community_user').then(data => {
      console.log(JSON.stringify(data));
      this.admin = data;
      this.getUnverifiedUsers()
      // setTimeout(this.getUnverifiedUsers,3000);
    })
      .catch(err => {
        console.log(err.message);
      });

      setTimeout(()=>{}, 5000);
      console.log(this.admin, 'FROM HERE')
  }


  // async waitForPromis() {
  //   let promise = await this.storage.get('local_community_user');
  //   return promise;
  // }

  getUnverifiedUsers() {
    // Fetching the data of unverified users belonging to admin's community to approve 
    this.userService.getAllUsers(this.admin.communityId).subscribe(
      (data) => {
        // console.log(JSON.stringify(data))
        if (data != null && data.length > 0) {
          // console.log("YIOEEEEEEE")
          this.unverifiedUserList = data;
        }
        else {
          /// GENERATE ALERT FOR NO USER IN COMMUNITY
          console.log('un verified Users in community not found');
        }
      },
      (err) => {
        this.router.navigate(["error"])
        console.log("ERROR OCCURED", err.message, JSON.stringify(err, null, '\t'));
      }
    )
  }

  userView() {
    this.router.navigateByUrl('signin')
  }

  verifyUser(person) {
    person.isUserVerified = true;
    /** Save this person to database so that next time he is not shown as
     * not-verified
      */
  }

  rejectUser(person) {
    person.isUserVerified = false;
    /** Delete this person from the database so that next time he is not shown in cards
     * as he was rejected by admin
      */
  }

}
