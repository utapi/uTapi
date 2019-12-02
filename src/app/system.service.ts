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
  }

  getProductDetailForProductID(productID: String): ProductDetail {
    return PRODUCTSDETAIL.find(item => item.ProductID === productID);
  }

  getShoppingCart() {
    if (!this.userID) return
    const itemsDoc = this.angularFirestore.collection('ShoppingCart').doc(`${this.userID}`)
    itemsDoc.valueChanges().subscribe(
      items => {
        this.shoppingCart = items ? items["shoppingCart"] : []
      }
    )
  }

  getUserID() {
    this.angularFireAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        const uid = user.uid;
        this.userID = uid
        this.getShoppingCart()
      }
    }.bind(this));
    this.angularFireAuth.auth.signInAnonymously();
  }

  setShoppingCart(ProductID: String, ProductNumber: Number) {
    const item = this.shoppingCart.find(item => item.ProductID === ProductID)
    const itemsDoc = this.angularFirestore.collection<ShoppingCart[]>('ShoppingCart').doc(`${this.userID}`)
    // add
    if (!item && ProductNumber > 0) {
      const cart = { ProductID, ProductNumber }
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
    itemsDoc.set({ 
      shoppingCart: this.shoppingCart,
      timestamp: firestore.FieldValue.serverTimestamp(),
     })
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
