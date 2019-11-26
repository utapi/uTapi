import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { CartPage } from '../cart/cart.page';
import { ProductListComponent } from '../product-list/product-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(
      [
        { path: '', component: Tab1Page },
        { path: 'cart', component: CartPage }
      ]
    )
  ],
  declarations: [Tab1Page, CartPage, ProductListComponent]
})
export class Tab1PageModule {}
