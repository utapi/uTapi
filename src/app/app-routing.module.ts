import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'order-history', loadChildren: './order-history/order-history.module#OrderHistoryPageModule' },
  { path: 'shop-address', loadChildren: './shop-address/shop-address.module#ShopAddressPageModule' },
  { path: 'app-help', loadChildren: './app-help/app-help.module#AppHelpPageModule' },
  { path: 'order-detail-copy', loadChildren: './order-detail-copy/order-detail-copy.module#OrderDetailCopyPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
