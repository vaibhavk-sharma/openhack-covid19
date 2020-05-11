import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-second',
  templateUrl: './initiate-payment.html',
  styleUrls: ['./initiate-payment.scss']
})
export class InitiatePaymentModal {
  isSubmitted: boolean;
  paymentForm: FormGroup= this.formBuilder.group({
    transactionId: ['', [Validators.required]]
  });;
  constructor(private formBuilder: FormBuilder,private popOverController: PopoverController) {}

  ionViewWillEnter() {
  }

  async paymentStart(){
    this.isSubmitted = true;
    if (this.paymentForm.valid) {
      await this.popOverController.dismiss({ form: this.paymentForm.value, isSubmitted: this.isSubmitted });
    }
  }
}