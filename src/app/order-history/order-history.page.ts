import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage  {

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
