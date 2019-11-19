import { Component } from '@angular/core';
import { PRODUCTLISTS } from '../mock.product';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  productLists = PRODUCTLISTS

  constructor() {}

}
