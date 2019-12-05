import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.page.html',
  styleUrls: ['./order-complete.page.scss'],
})
export class OrderCompletePage implements OnInit {

  public orderDetail = this.systemService.orderDetail
  public waitingTime: any = "計算中..."

  constructor(private router: Router, private systemService: SystemService) {
    if (!this.orderDetail) {
      this.router.navigate(['/tabs/tab1'])
      setInterval(() => {
        this.orderDetail = this.systemService.orderDetail
      }, 1000);
    }
    this.getWaitingTime()
  }

  ngOnInit() {
  }

  getWaitingTime() {
    this.systemService.getWaitingTime(this.orderDetail.orderID).subscribe(
      items => {
        this.waitingTime = items.length * 2 + "分"
      }
    )
  }

}
