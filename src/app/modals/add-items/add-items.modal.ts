import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { ItemInfo } from 'src/shared/models/item.model';
@Component({
  selector: 'app-add-tems',
  templateUrl: './add-items.html',
  styleUrls: ['./add-items.scss']
})
export class AddItemsModal{
  item: ItemInfo;
  isSubmitted: boolean;
  addItemsForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    baseUnit: ['Kilos', [Validators.required]],
    pricePerUnit: ['', [Validators.required]]
  });
  constructor(private formBuilder: FormBuilder,private popOverController: PopoverController) {}

  ionViewWillEnter() {
    if(this.item){
      this.addItemsForm.controls.name.setValue(this.item.name);
      this.addItemsForm.controls.quantity.setValue(this.item.quantity);
      this.addItemsForm.controls.baseUnit.setValue(this.item.baseUnit);
      this.addItemsForm.controls.pricePerUnit.setValue(this.item.pricePerUnit);
    }
  }

  async addNewItem(){
    this.isSubmitted = true;
    if (this.addItemsForm.valid) {
      await this.popOverController.dismiss({ form: this.addItemsForm, isSubmitted: this.isSubmitted });
    }
  }
}