import { Component, ViewChild} from '@angular/core';
import {IonSlides } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  // @ViewChild('slides', { static: true }) slider: IonSlides;  
  // segment = 0;  
  // constructor() { }  
  // async segmentChanged(ev: any) {  
  //   await this.slider.slideTo(this.segment);  
  // }  
  // async slideChanged() {  
  //   this.segment = await this.slider.getActiveIndex();  
  // }
}
