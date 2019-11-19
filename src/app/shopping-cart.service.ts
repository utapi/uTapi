import { Injectable } from '@angular/core';
import { ProductClass, ProductDetail, ShoppingCart } from './types';
import { PRODUCTCLASS, PRODUCTSDETAIL } from './mock.product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  private shoppingCart: ShoppingCart[] = []

  getProductClass(): Observable<ProductClass[]> {
    return of(PRODUCTCLASS);
  }

  getProductDetailOne(productID: String): ProductDetail {
      return PRODUCTSDETAIL.find(item => item.ProductID === productID);
  }

  getProductDetail(productID: String): Observable<ProductDetail[]> {
    return of(PRODUCTSDETAIL);
  }
  
  getProductList(classID: String): ProductDetail[] {
    const items = classID
        ? PRODUCTSDETAIL.filter(item => item.ClassID === classID)
        : PRODUCTSDETAIL

    return items;
  }
  
  setShoppingCart(ProductID: String, ProductNumber: Number): void {
    const item = this.shoppingCart.find(item => item.ProductID === ProductID)
    // add
    if (!item && ProductNumber > 0) {
      this.shoppingCart.push({ProductID, ProductNumber})
    }
    // change
    if (item && ProductNumber > 0) {
      this.shoppingCart = this.shoppingCart.map(item => {
        if (item.ProductID === ProductID) {
          item.ProductNumber = ProductNumber
        }
        return item
      })
    }
    // del
    if (ProductNumber == 0) {
      this.shoppingCart = this.shoppingCart.filter(item => item.ProductID != ProductID)
    }
  }

  getTotalPrice(): Number {
    let totalPrice = 0
    this.shoppingCart.map(item => {
      const product = this.getProductDetailOne(item.ProductID)
      const ProductPrice: any = product.ProductPrice
      const ProductNumber: any = item.ProductNumber
      totalPrice += ProductPrice * ProductNumber
    })
    return totalPrice
  }

}
