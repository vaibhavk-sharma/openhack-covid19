import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-second',
  templateUrl: './view-order.html',
  styleUrls: ['./view-order.scss']
})
export class ViewOrderModal {
  order: any;
  constructor(private formBuilder: FormBuilder,private popOverController: PopoverController) {}

  ionViewWillEnter() {
    
  }
}