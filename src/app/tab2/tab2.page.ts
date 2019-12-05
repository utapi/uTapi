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
  public userID
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
