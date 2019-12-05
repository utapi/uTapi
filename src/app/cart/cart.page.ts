import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { ShoppingCart } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  totalPrice: Number = 0
  totalNumber: Number = 0
  shoppingCart: ShoppingCart[] = this.systemService.shoppingCart
  receiveMethod: String = "店舗受取"
  payMethod: String = "現金"
  toShopMemo: String = ""
  userID

  constructor(private router: Router,
    private systemService: SystemService
  ) {

  }

  ngOnInit() {
    if (!this.shoppingCart.length) {
      this.router.navigate(['/tabs/tab1'])
      setTimeout(() => {
        this.shoppingCart = this.systemService.shoppingCart
      }, 1000);
    }
    this.getTotalPrice()
    this.getTotalNumber()
    this.systemService.getUserID().subscribe(user => {
      this.userID = user.uid
    })

    this.systemService.getShoppingCartByUserID(this.userID).valueChanges().subscribe(cart => {
      if (cart && cart["shoppingCart"]) {
        this.systemService.shoppingCart = cart["shoppingCart"]
      }
      this.systemService.getProductClass().subscribe(
        items => {
          this.getTotalPrice()
          this.getTotalNumber()
        }
      );
    })
  }

  getTotalPrice() {
    this.totalPrice = this.systemService.getTotalPrice()
  }
  getTotalNumber() {
    this.totalNumber = this.systemService.getTotalNumber()
  }

  toOrderComplete() {
    let orderDetail = {
      receiveMethod: this.receiveMethod,
      payMethod: this.payMethod,
      toShopMemo: this.toShopMemo,
      userID: this.userID
    }
    this.systemService.saveOrder(orderDetail)
    this.router.navigate(['/tabs/tab1/order-complete'])
  }

}
