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
  userID
  constructor(private systemService: SystemService) {
    this.systemService.getUserID().subscribe(user => {
      this.userID = user.uid
      this.getOrderList()
    })
  }

  getOrderList() {
    this.systemService.getOrderDetailByUserID(this.userID).subscribe(
      items => {
        this.orderList = items
        this.having = (items.length) ? true : false
        this.geting = false
      }
    )
  }

}
