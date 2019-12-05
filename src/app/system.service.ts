import { Injectable } from '@angular/core';
import { ProductClass, ProductDetail, ShoppingCart } from './types';
import { PRODUCTCLASS, PRODUCTSDETAIL } from './mock.product';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  public shoppingCart: ShoppingCart[] = []
  public orderDetail: any

  constructor(private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.angularFireAuth.auth.signInAnonymously();
    this.router.navigate(['/tabs/tab1']);
  }

  getUserID(): Observable<firebase.User> {
    return this.angularFireAuth.authState
  }

  getProductDetailByProductID(productID: String): ProductDetail {
    return PRODUCTSDETAIL.find(item => item.productID === productID);
  }

  getShoppingCartByUserID(userID: any): AngularFirestoreDocument<any> {
    return this.angularFirestore.collection('shoppingCart').doc(`${userID}`)
  }

  getProductDetailForProductID(productID: String): ProductDetail {
    return PRODUCTSDETAIL.find(item => item.productID === productID);
  }

  setShoppingCart(productID: String, productNumber: Number, userID: String): void {
    const ProductDetail = this.shoppingCart.find(item => item.productID === productID);
    // add
    if (!ProductDetail && productNumber > 0) {
      const cart = { productID, productNumber }
      this.shoppingCart.push(cart)
    }
    // change
    if (ProductDetail && productNumber > 0) {
      this.shoppingCart = this.shoppingCart.map(item => {
        if (item.productID === productID) {
          item.productNumber = productNumber
        }
        return item
      })
    }
    // del
    if (productNumber == 0) {
      this.shoppingCart = this.shoppingCart.filter(item => item.productID != productID)
    }
    this.getShoppingCartByUserID(userID).set({
      shoppingCart: this.shoppingCart,
      timestamp: firestore.FieldValue.serverTimestamp(),
    })
  }

  getTotalPrice(): Number {
    let totalPrice = 0
    this.shoppingCart.map(cart => {
      const productDetail = this.getProductDetailByProductID(cart["productID"])
      const productPrice: any = productDetail.productPrice
      const productNumber: any = cart.productNumber
      totalPrice += productPrice * productNumber
    })
    return totalPrice
  }

  getTotalNumber(): Number {
    let totalNumber = 0
    this.shoppingCart.map(cart => {
      const productNumber: any = cart.productNumber
      totalNumber += productNumber
    })
    return totalNumber
  }

  getProductClass(): Observable<ProductClass[]> {
    return of(PRODUCTCLASS);
  }

  getProductListByClassID(classID: String): ProductDetail[] {
    let items = classID
      ? PRODUCTSDETAIL.filter(item => item.classID === classID)
      : PRODUCTSDETAIL

    items.map(item => {
      let cart = this.shoppingCart.find(s => s.productID === item.productID)
      item.productNumber = cart ? cart.productNumber : ""
    })
    return items;
  }

  getWaitingTime(OrderID: String): Observable<any> {
    return this.angularFirestore.collection('orderDetail', ref => ref.where('orderID', '<', OrderID)).valueChanges()
  }

  getOrderDetailByUserID(userID: String): Observable<any> {
    return this.angularFirestore.collection('orderDetail', ref => ref.where('userID', '==', userID).orderBy('timestamp', 'desc')).valueChanges()
  }

  getOrderDetailByOrderID(OrderID: String): Observable<any> {
    return this.angularFirestore.collection('orderDetail').doc(`${OrderID}`).valueChanges()
  }

  saveFeedback(star, title, content) {
    this.angularFirestore.collection('feedback').doc(this.generateIDByTimestamp()).set({
      star,
      title,
      content,
      timestamp: firestore.FieldValue.serverTimestamp(),
    })
  }

  generateIDByTimestamp() {
    const myDate = new Date();
    const ID = myDate.getFullYear()
      + this.PrefixInteger(myDate.getMonth() + 1, 2)
      + this.PrefixInteger(myDate.getDate(), 2)
      + this.PrefixInteger(myDate.getHours(), 2)
      + this.PrefixInteger(myDate.getMinutes(), 2)
      + this.PrefixInteger(myDate.getSeconds(), 2)
      + this.PrefixInteger(this.RandomNumBoth(0, 9999), 4)
    return ID
  }

  saveOrder(orderDetail: any) {
    const orderID = this.generateIDByTimestamp()
    const productList = this.shoppingCart.map(item => {
      item["productName"] = this.getProductDetailForProductID(item.productID).productName
      item["productPrice"] = this.getProductDetailForProductID(item.productID).productPrice
      return item
    })
    const orderDetailDoc = this.angularFirestore.collection('orderDetail').doc(orderID)
    this.orderDetail = {
      orderID: orderID,
      userID: orderDetail.userID,
      receiveMethod: orderDetail.receiveMethod,
      payMethod: orderDetail.payMethod,
      toShopMemo: orderDetail.toShopMemo,
      orderStatus: "準備中",
      productList: productList,
      timestamp: firestore.FieldValue.serverTimestamp(),
    }
    orderDetailDoc.set(this.orderDetail)

    this.shoppingCart = []
    const itemsDoc = this.angularFirestore.collection<ShoppingCart[]>('shoppingCart').doc(`${orderDetail.userID}`)
    itemsDoc.set({
      shoppingCart: this.shoppingCart,
      timestamp: firestore.FieldValue.serverTimestamp(),
    })

    return this.orderDetail
  }


  RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range);
    return num;
  }

  PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  }

}
