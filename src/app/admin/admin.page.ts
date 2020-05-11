import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/user.service';
import { Storage } from '@ionic/storage';
// import { toastController } from 'https://cdn.jsdelivr.net/npm/@ionic/core@next/dist/ionic/index.esm.js';
import { toastController } from '@ionic/core';
// import { NavParams } from 'ionic-angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  admin: any;
  unverifiedUserList : any;
  flag:boolean;

  constructor(private router: Router,
    private storage: Storage,
    private userService: UserService,
    // public navCtrl: NavController,
    // public navParams: NavParams
    ) {
      // this.user = navParams.get('incomingUser');
      this.flag=false;
     }

    ionViewWillEnter() {
    //GOT data from local_community_user to store in user
    this.storage.get('local_community_user').then(data => {
      if(data!=null){
        console.log(JSON.stringify(data));
        this.admin = data;
        this.getUnverifiedUsers();
      }
    })
      .catch(err => {
        console.log(err.message);
      });

      //setTimeout(()=>{}, 5000);
      
  }

  // Fetching the data of unverified users belonging to admin's community to approve 
  getUnverifiedUsers() {
    this.userService.getAllUsers(this.admin.communityId).subscribe(
      (data) => {
        // console.log(JSON.stringify(data))
        if (data != null && data.length > 0) {
          // console.log("YIOEEEEEEE")
          this.unverifiedUserList = data;
          this.flag = false;
        }
        else {
          /// GENERATE ALERT FOR NO USER IN COMMUNITY
          let messageObj = {
            message : 'Sorry! No Users to View',
            status : 'sorry'
          }
          this.unverifiedUserList=[];
          this.handleButtonClick(messageObj);
        }
      },
      (err) => {
        this.router.navigate(["error"])
        console.log("ERROR OCCURED", err.message, JSON.stringify(err, null, '\t'));
      }
    )
  }

  userView() {
    this.router.navigateByUrl('user-dashboard')
  }

  verifyUser(person) {
    person.isUserVerified = true;
    /** Save this person to database so that next time he is not shown as
     * not-verified
      */
     this.userService.updateUserAsVerified(person).subscribe((data) => {
      if (data != null && data._id != null) {
        // person.isUserVerified = true;
        person._id = data._id;
        person._rev = data._rev;
        this.storage.set('local_community_user', person);
        let messageObj = {
          message : 'User Accepted Successfully',
          status : 'accept'
        }
        this.handleButtonClick(messageObj);
        console.log(JSON.stringify(person, null, '\t'));
      }
      else {
        console.log("CANNOT COMPLETE THE OPERATION")
      }
    },
      (err) => {
        console.log(err.message);
      });
    
  }

  rejectUser(person) {
    person.isUserVerified = false;
    /** Delete this person from the database so that next time he is not shown in cards
     * as he was rejected by admin
      */
     this.userService.deleteRejectedUser(person).subscribe((data) => {
      if (data != null && data.statusCode == '202') {
        console.log("USER REJECTED SUCCESSFULLY");
        let messageObj = {
          message : 'User Rejected Successfully',
          status : 'reject'
        }
        this.handleButtonClick(messageObj);
        
      }
      else {
        console.log("CANNOT COMPLETE THE OPERATION")
      }
    },
      (err) => {
        console.log(err.message);
      });
  }

  async handleButtonClick(messageObject : any) {
    let color = '';
    let duration = 2000;
    if(messageObject.status == 'accept') {
      color = 'success'
      this.flag=false;
    }
    else if (messageObject.status == 'reject') {
      color = 'dark'
      this.flag=false;
    }
    else {
      color = 'tertiary'
      duration = 5000
      this.flag=true;
    }
    const toast = await toastController.create({
      color: color,
      duration: duration,
      message: messageObject.message
      // showCloseButton: true
    });
    
    await toast.present();
    if(this.flag === false)
      this.getUnverifiedUsers();
    
  }

}
