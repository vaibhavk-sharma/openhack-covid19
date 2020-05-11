import { Component, OnInit, Output } from '@angular/core';
import { ItemInfo } from 'src/shared/models/item.model';
@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.html',
  styleUrls: ['./show-items.scss']
})
export class ShowItemsModal {
  item: ItemInfo;
  isSubmitted: boolean;
  constructor() {}
  
}