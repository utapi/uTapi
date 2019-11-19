import { Component, OnInit, Input } from '@angular/core';
import { ProductList } from '../types';
import { Products } from '../mock.product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  @Input()
  productLists: ProductList
  
  constructor() { }

  changeNumber(ProductID: String, ProductNumber: String) {
    const Product = Products.find(Product => Product.ProductID === ProductID);
    console.log(Product)

    console.log({ProductID, ProductNumber})
  }

  ngOnInit() {
  }

}
