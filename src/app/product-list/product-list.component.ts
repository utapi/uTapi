import { Component, OnInit, Input } from '@angular/core';
import { ProductClass, ProductDetail } from '../types';
import { SystemService } from '../system.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  productClass: ProductClass[]
  totalPrice: Number
  totalNumber: Number = 0
  userID
  loading
  isLoading = true

  constructor(
    private systemService: SystemService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();

    this.systemService.getUserID().subscribe(user => {
      this.userID = user.uid
      this.getProductClass();
      this.getTotalPrice()
      this.getTotalNumber()

    })
  }

  getProductClass(): void {
    this.systemService.getShoppingCartByUserID(this.userID).valueChanges().subscribe(cart => {
      if (cart && cart["shoppingCart"]) {
        this.systemService.shoppingCart = cart["shoppingCart"]
      }
      this.systemService.getProductClass().subscribe(
        items => {
          items.map(item => {
            item["productList"] = this.systemService.getProductListByClassID(item["classID"])
            return item
          })
          this.productClass = items
          this.getTotalPrice()
          this.getTotalNumber()
          this.loading.dismiss()
          this.isLoading = false
        }
      );
    })
  }

  changeNumber(ProductID: String, ProductNumber: String) {
    this.systemService.setShoppingCart(
      ProductID,
      Number(ProductNumber),
      this.userID
    )
    this.getTotalPrice()
    this.getTotalNumber()
  }

  getTotalPrice() {
    this.totalPrice = this.systemService.getTotalPrice()
  }
  getTotalNumber() {
    this.totalNumber = this.systemService.getTotalNumber()
  }

  async toCartPage() {
    if (this.systemService.shoppingCart.length) {
      this.router.navigate(['/tabs/tab1/cart'])
    } else {
      const alert = await this.alertController.create({
        header: '商品が選択されていません',
        message: '商品の数量を選択してください',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
