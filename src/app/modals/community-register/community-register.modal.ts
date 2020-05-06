import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-second',
  templateUrl: './community-register.html',
  styleUrls: ['./community-register.scss']
})
export class CommunityRegisterModal implements OnInit {
  isSubmitted: boolean;
  communityForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private popOverController: PopoverController) {}

  ngOnInit() {
    this.communityForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        pinCode: ['', [Validators.required]]
      })
    });
  }

  async register(){
    this.isSubmitted = true;
    if (this.communityForm.valid) {
      await this.popOverController.dismiss({ form: this.communityForm, isSubmitted: this.isSubmitted });
    }
  }
}