import { Component, OnInit, Input } from '@angular/core';
import { ProductClass, ProductDetail } from '../types';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  productClass: ProductClass[]
  totalPrice: Number
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getProductClass();
    this.getTotalPrice()
  }
  
  getProductClass(): void {
    this.shoppingCartService.getProductClass().subscribe(
      items => this.productClass = items
    );
  }
  
  changeNumber(ProductID: String, ProductNumber: String) {
    this.shoppingCartService.setShoppingCart(
      ProductID,
      Number(ProductNumber)
    )
    this.getTotalPrice()
  }

  getTotalPrice() {
    this.totalPrice = this.shoppingCartService.getTotalPrice()
  }

}
