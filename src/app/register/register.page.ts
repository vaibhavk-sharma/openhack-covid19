import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  dashboard_value:boolean
  pendingForms : boolean

  constructor(private menu : MenuController, public route:Router) {
    this.dashboard_value=false;
    this.pendingForms=false;
   }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  
  dashboard(){
    this.pendingForms=false;
    this.dashboard_value=true;
    console.log("Loading DashBoard")

  }


  forms(){
    this.dashboard_value=false;
    this.pendingForms=true;

  }

  logout(){
    this.route.navigateByUrl('/')
  }

}
