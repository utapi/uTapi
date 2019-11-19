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
  }
  
  getProductClass(): void {
    this.shoppingCartService.getProductClass().subscribe(
      items => this.productClass = items
    );
  }
  
  changeNumber(ProductID: String, ProductNumber: Number) {
    this.shoppingCartService.setShoppingCart(
      ProductID,
      ProductNumber
    )
    this.totalPrice = this.shoppingCartService.getTotalPrice()
  }

}
