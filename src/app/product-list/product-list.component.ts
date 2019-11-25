import { Component, OnInit, Input } from '@angular/core';
import { ProductClass, ProductDetail } from '../types';
import { SystemService } from '../system.service';

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
    private systemService: SystemService
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

}
