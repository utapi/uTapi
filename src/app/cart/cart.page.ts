import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { ShoppingCart, AddressInfo, CreditInfo } from '../types';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  addressShow = true
  addressInfo = {
    fullName: "",
    postalCode: "",
    prefectures: "",
    city: "",
    building: "",
    phoneNumber: "",
  }
  creditInfo = {
    cardHolder: "",
    cardNumber: "",
    expirationYear: "",
    expirationMonth: "",
    securityCode: "",
  }

  constructor(
    private alertController: AlertController,
    private router: Router,
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

  async toOrderComplete() {
    if (this.receiveMethod == '配送') {
      if (
        !this.addressInfo.fullName
        || !this.addressInfo.postalCode
        || !this.addressInfo.prefectures
        || !this.addressInfo.city
        || !this.addressInfo.building
        || !this.addressInfo.phoneNumber
      ) {
        const alert = await this.alertController.create({
          header: '受け渡し場所を入力されていません',
          message: '受け渡し場所を入力してください',
          buttons: [
            {
              text: 'OK',
              handler: () => {}
            }
          ]
        });
        await alert.present();
        return;
      }
    }

    if (this.payMethod == 'クレジットカード') {
      if (
        !this.creditInfo.cardHolder
        || !this.creditInfo.cardNumber
        || !this.creditInfo.expirationYear
        || !this.creditInfo.expirationMonth
        || !this.creditInfo.securityCode
      ) {
        const alert = await this.alertController.create({
          header: 'カード情報を入力されていません',
          message: 'カード情報を入力してください',
          buttons: [
            {
              text: 'OK',
              handler: () => {}
            }
          ]
        });
        await alert.present();
        return;
      }
    }

    let orderDetail = {
      receiveMethod: this.receiveMethod,
      payMethod: this.payMethod,
      toShopMemo: this.toShopMemo,
      userID: this.userID,
      addressInfo: this.addressInfo,
      creditInfo: this.creditInfo
    }
    this.systemService.saveOrder(orderDetail)
    this.router.navigate(['/tabs/tab1/order-complete'])
  }

}
