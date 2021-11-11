import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductBannerComponent } from './Components/product-banner/product-banner.component';
import { ProductCategoryComponent } from './Components/product-category/product-category.component';
import { AppMaterialModule } from '../app-material.module';
import { RouterModule } from '@angular/router';
import { ProductViewComponent } from './Components/product-view/product-view.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductBannerComponent,
    ProductCategoryComponent,
    ProductViewComponent,
    ProductDetailComponent,
  ],
  imports: [RouterModule, CommonModule, AppMaterialModule],
  exports: [
    ProductCardComponent,
    ProductBannerComponent,
    ProductCategoryComponent,
    ProductViewComponent,
    ProductDetailComponent,
  ],
})
export class ProductModule {}
