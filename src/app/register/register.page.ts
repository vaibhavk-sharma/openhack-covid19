import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from "@angular/forms";
import { User } from '../../shared/models/user.model';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/shared/services/user.service';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Community, RegisterCommunityInput } from 'src/shared/models/community.model';
import { CommunityService } from 'src/shared/services/community.service';
import { CommunityRegisterModal } from '../modals/community-register/community-register.modal';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: any;
  isSubmitted: boolean;
  showSpinner: boolean;
  registerForm: FormGroup;
  subType: FormControl = new FormControl('Grocery');
  communityList: Community[] = [];
  isNewCommunity: boolean;
  constructor(
    public formBuilder: FormBuilder,
    private storage: Storage,
    private userService: UserService,
    private communityService: CommunityService,
    private router: Router,
    public alertController: AlertController,
    public popOverController: PopoverController
  ) { }

  ngOnInit() {
    this.storage.get('local_community_user').then(data => {
      this.user = data;
    })
    .catch(err => {
      console.log(err.message);
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', []],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        pinCode: ['', [Validators.required]]
      }),
      phoneNumber: ['', []],
      type: ['Resident', []],
      residentCommunity: ['', []],
      supplierCommunity: ['', []]
    }, {
      validator: this.validateCommunity('type', 'residentCommunity', 'supplierCommunity'),
    }
    )

    this.registerForm.controls['type'].valueChanges
      .subscribe(value => {
        if (value === 'Supplier') {
          if (this.isNewCommunity) {
            this.isNewCommunity = false;
            this.communityList = [];
          }
          this.registerForm.addControl('subType', this.subType);
        }
        else {
          if (this.registerForm.contains('subType')) {
            this.registerForm.removeControl('subType');
          }
        }
      });
  }

  register(event: any) {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      var newUser = new User();
      var communityRegisterInput = new RegisterCommunityInput();
      newUser.firstName = this.registerForm.value.firstName;
      newUser.lastName = this.registerForm.value.lastName;
      newUser.address = this.registerForm.value.address;
      newUser.email = this.user.email;
      newUser.phoneNumber = this.registerForm.value.phoneNumber;
      newUser.type = this.registerForm.value.type;
      newUser.subType = this.registerForm.value.subType;
      newUser.isAdmin = false;
      newUser.isUserVerified=false;
      if (this.registerForm.value.type == "Resident") {
        var community = this.communityList.filter(x => x.name === this.registerForm.value.residentCommunity);
        if (this.isNewCommunity && community[0] && community[0].communityId == undefined) {
          communityRegisterInput.community = community[0];
        }
        newUser.communityId = community[0].communityId;
      }
      else {
        newUser.communityId = [];
        this.registerForm.value.supplierCommunity.forEach(community => {
          var tempCommunity = this.communityList.filter(x => x.name === community);
          newUser.communityId.push(tempCommunity[0].communityId);
        });
      }
      if (this.isNewCommunity && newUser.communityId == undefined) {
        this.communityService.registerCommunity(communityRegisterInput).subscribe((data) => {
          newUser.communityId = data._id;
          newUser.isAdmin = true;
          newUser.isUserVerified= true;
          this.user.communityId= data._id;
          this.registerUser(newUser);
        }, (error) => {
          this.presentAlert();
        })
      }
      else {
        this.registerUser(newUser);
      }

    }
  }

  private registerUser(newUser: any) {
    this.userService.registerUser(newUser).subscribe((data) => {
      if (data != null && data._id != null) {
        this.user._id = data._id;
        this.user._revId = data._revId;
        this.storage.set('local_community_user', this.user);
        console.log(JSON.stringify(this.user, null, '\t'));
        this.router.navigateByUrl('user-dashboard');
      }
      else {
        this.presentAlert();
      }
    },
      (err) => {
        this.presentAlert();
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Unable to process the request currently. Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }

  filterList(event: any) {
    const searchTerm = event.srcElement && event.srcElement.value && event.target && event.target.value;
    this.showSpinner = true;
    this.registerForm.controls.residentCommunity.setValue('');
    this.registerForm.controls.supplierCommunity.setValue([]);
    if (!searchTerm) {
      this.communityList = [];
      this.showSpinner = false;
      return;
    }

    this.communityService.FilterBySearchTerm(searchTerm).subscribe((communityList) => {
      if (communityList != null && communityList.length > 0) {
        communityList.forEach(community => {
          var tempComm = new Community();
          tempComm.communityId = community._id;
          tempComm.name = community.name;
          tempComm.address = community.address;
          var commCheck = this.communityList.filter(x => x.name == tempComm.name);
          if (commCheck != null && commCheck.length == 0)
            this.communityList.push(tempComm);
        });
        this.showSpinner = false;
      }
      else {
        this.showSpinner = false;
      }
    },
      (error) => {
        this.showSpinner = false;
        this.router.navigate(["error"]);
      });
  }

  validateCommunity(type: string, residentCommunity: string, supplierCommunity: string) {
    return (formGroup: FormGroup) => {
      const typeControl = formGroup.controls[type];
      const residentCommunityControl = formGroup.controls[residentCommunity];
      const supplierCommunityControl = formGroup.controls[supplierCommunity];
      if (typeControl.value == "Resident") {
        if (residentCommunityControl.value == "") {
          residentCommunityControl.setErrors({ required: true });
        }
        else {
          residentCommunityControl.setErrors(null);
        }
      }
      else {
        if (supplierCommunityControl.value == "") {
          supplierCommunityControl.setErrors({ required: true });
        }
        else {
          supplierCommunityControl.setErrors(null);
        }
      }
    }
  }
  dashboard_value:boolean
  pendingForms : boolean

  async newCommunityClick() {
    const modal = await this.popOverController.create({
      component: CommunityRegisterModal,
      animated: true,
      cssClass: 'contact-popover'
    });
    modal.onWillDismiss().then(returnedData => {
      if (returnedData.data && returnedData.data.form && returnedData.data.form.valid && returnedData.data.isSubmitted) {
        var community = new Community();
        community = returnedData.data.form.value;
        this.communityList.push(community);
        this.isNewCommunity = true;
        this.registerForm.controls.residentCommunity.setValue(community.name);
      }
    });
    return await modal.present();

}
// //Navigating to homepage after registration
// homepage(){
//   this.router.navigateByUrl('signin')
// }
}
