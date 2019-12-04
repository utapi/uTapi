import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { OrderDetailPage } from '../order-detail/order-detail.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Tab2Page },
      { path: 'order-detail/:id', component: OrderDetailPage },
    ])
  ],
  declarations: [Tab2Page, OrderDetailPage]
})
export class Tab2PageModule { }
