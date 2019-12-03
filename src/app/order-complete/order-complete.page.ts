import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.page.html',
  styleUrls: ['./order-complete.page.scss'],
})
export class OrderCompletePage implements OnInit {

  public OrderDetail = this.systemService.OrderDetail
  public waitingTime: any = "計算中..."

  constructor(private router: Router, private systemService: SystemService) {
    if (!this.OrderDetail) {
      this.router.navigate(['/tabs/tab1'])
      setInterval(() => {
        this.OrderDetail = this.systemService.OrderDetail
      }, 1000);
    }
    this.getWaitingTime()
    
  }

  ngOnInit() {
  }

  getWaitingTime() {
    this.systemService.getWaitingTime(this.OrderDetail.OrderID).subscribe(
      items => {
        this.waitingTime = items.length * 2 + "分"
      }
    )
  }

}
