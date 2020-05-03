import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from "@angular/forms";
import { User } from '../../shared/models/user.model';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/shared/services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: any;
  isSubmitted: boolean;
  registerForm: FormGroup;
  subType: FormControl = new FormControl('Grocery');
  constructor(
    public formBuilder: FormBuilder,
    private storage: Storage,
    private userService: UserService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.user = this.storage.get('local_community_user');
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', []],
      address: ['', [Validators.required]],
      phoneNumber: ['', []],
      type: ['Resident', []]
    })

    this.registerForm.controls['type'].valueChanges
      .subscribe(value => {
        if (value === 'Supplier') {
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
    if (this.registerForm.valid) {
      this.isSubmitted = true;
      var newUser = new User();
      newUser.firstName = this.registerForm.value.firstName;
      newUser.lastName = this.registerForm.value.lastName;
      newUser.address = this.registerForm.value.address;
      newUser.email = this.user.email;
      newUser.phoneNumber = this.registerForm.value.phoneNumber;
      newUser.type = this.registerForm.value.type;
      newUser.subType = this.registerForm.value.subType;
      newUser.items = null;
      newUser.communityId = null;
      this.userService.registerUser(newUser).subscribe((data)=>{
        if(data!=null && data._id!=null){
          this.user._id = data._id;
          this.user._revId = data._revId;
          this.storage.set('local_community_user',this.user);
          this.router.navigate(['secured/home'])
        }
        else{
          this.presentAlert();
        }
      },
      (err) => {
        this.presentAlert();
      });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Unable to process the request currently. Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }

}
