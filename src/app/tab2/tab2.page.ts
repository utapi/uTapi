import { Component } from '@angular/core';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public geting = true
  public having = false
  public orderList = []
  constructor(private systemService: SystemService) {
    this.getOrderList()
  }

  getOrderList() {
    this.systemService.getMyOrder().subscribe(
      items => {
        this.orderList = items
        this.having = (items.length) ? true : false
        this.geting = false
      }
    )
  }

}
