import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../system.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  orderDetail
  loading = true
  public waitingTime: any = "計算中..."

  constructor(private router: Router,
    private systemService: SystemService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    const orderID = this.route.snapshot.paramMap.get('id');
    this.systemService.getOrderDetailByOrderID(orderID).subscribe(item => {
      this.orderDetail = item
      this.loading = false
      this.getWaitingTime()
    })
  }

  getWaitingTime() {
    this.systemService.getWaitingTime(this.orderDetail.orderID).subscribe(
      items => {
        this.waitingTime = items.length * 2 + "分"
      }
    )
  }

}
