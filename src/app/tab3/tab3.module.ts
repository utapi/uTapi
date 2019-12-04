import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { OrderHistoryPage } from '../order-history/order-history.page';
import { ShopAddressPage } from '../shop-address/shop-address.page';
import { AppHelpPage } from '../app-help/app-help.page';
import { OrderDetailCopyPage } from '../order-detail-copy/order-detail-copy.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Tab3Page },
      { path: 'order-history', component: OrderHistoryPage },
      { path: 'shop-address', component: ShopAddressPage },
      { path: 'app-help', component: AppHelpPage },
      { path: 'order-detail/:id', component: OrderDetailCopyPage },
    ])
  ],
  declarations: [Tab3Page, OrderHistoryPage, ShopAddressPage, AppHelpPage, OrderDetailCopyPage]
})
export class Tab3PageModule { }
