import { Component, OnInit, Input } from '@angular/core';
import { ProductClass, ProductDetail } from '../types';
import { SystemService } from '../system.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  productClass: ProductClass[]
  totalPrice: Number
  totalNumber: Number = 0
  
  constructor(
    private systemService: SystemService,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getProductClass();
    this.getTotalPrice()
    this.getTotalNumber()
  }
  
  getProductClass(): void {
    this.systemService.getProductClass().subscribe(
      items => this.productClass = items
    );
  }
  
  changeNumber(ProductID: String, ProductNumber: String) {
    this.systemService.setShoppingCart(
      ProductID,
      Number(ProductNumber)
    )
    this.getTotalPrice()
    this.getTotalNumber()
  }

  getTotalPrice() {
    this.systemService.getTotalPrice().subscribe(
      totalPrice => 
        this.totalPrice = totalPrice
    );
  }
  getTotalNumber() {
    this.systemService.getTotalNumber().subscribe(
      totalNumber => 
        this.totalNumber = totalNumber
    );
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
