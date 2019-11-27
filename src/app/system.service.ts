import { Injectable } from '@angular/core';
import { ProductClass, ProductDetail, ShoppingCart } from './types';
import { PRODUCTCLASS, PRODUCTSDETAIL } from './mock.product';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  public userID: String
  public shoppingCart: ShoppingCart[] = []

  constructor(private angularFirestore: AngularFirestore,
              private angularFireAuth: AngularFireAuth
  ) {
    this.getUserID()
    this.getShoppingCart()
  }

  getProductDetailForProductID(productID: String): ProductDetail {
    return PRODUCTSDETAIL.find(item => item.ProductID === productID);
  }

  async getShoppingCart() {
    const UserID = await this.getUserID()
    const itemsDoc = this.angularFirestore.collection('ShoppingCart').doc(`${UserID}`)
    itemsDoc.valueChanges().subscribe(
      items => {
        this.shoppingCart = items ? items["shoppingCart"] : []
        this.getTotalPrice()
        this.getTotalNumber()
      }
    )
  }

  async getUserID() {
    if (!this.userID) {
      const credential = await this.angularFireAuth.auth.signInAnonymously();
      this.userID = credential.user.uid
    }
    return this.userID
  }

  async setShoppingCart(ProductID: String, ProductNumber: Number) {
    const item = this.shoppingCart.find(item => item.ProductID === ProductID)
    const UserID = await this.getUserID()
    const itemsDoc = this.angularFirestore.collection<ShoppingCart[]>('ShoppingCart').doc(`${UserID}`)
    // add
    if (!item && ProductNumber > 0) {
      const cart = {ProductID, ProductNumber}
      this.shoppingCart.push(cart)
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
    itemsDoc.set({shoppingCart: this.shoppingCart})
  }
  getTotalPrice(): Observable<Number> {
    let totalPrice = 0
    this.shoppingCart.map(item => {
      const product = this.getProductDetailForProductID(item.ProductID)
      const ProductPrice: any = product.ProductPrice
      const ProductNumber: any = item.ProductNumber
      totalPrice += ProductPrice * ProductNumber
    })
    return of(totalPrice)
  }

  getTotalNumber(): Observable<Number> {
    let totalNumber = 0
    this.shoppingCart.map(item => {
      const ProductNumber: any = item.ProductNumber
      totalNumber += ProductNumber
    })
    return of(totalNumber)
  }

  
  getProductClass(): Observable<ProductClass[]> {
    return of(PRODUCTCLASS);
  }

  getProductDetail(productID: String): Observable<ProductDetail[]> {
    return of(PRODUCTSDETAIL);
  }
  
  getProductList(classID: String): ProductDetail[] {
    let items = classID
        ? PRODUCTSDETAIL.filter(item => item.ClassID === classID)
        : PRODUCTSDETAIL

    items.map(item => {
      let cart = this.shoppingCart.find(s => s.ProductID === item.ProductID)
      item.ProductNumber = cart ? cart.ProductNumber : ""
    })

    return items;
  }

}
