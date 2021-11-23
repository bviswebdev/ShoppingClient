import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductBannerComponent } from './Components/product-banner/product-banner.component';
import { ProductCategoryComponent } from './Components/product-category/product-category.component';
import { AppMaterialModule } from '../app-material.module';
import { RouterModule } from '@angular/router';
import { ProductViewComponent } from './Components/product-view/product-view.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { ProductEditComponent } from './Components/product-edit/product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductBannerComponent,
    ProductCategoryComponent,
    ProductViewComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
  imports: [RouterModule, CommonModule, AppMaterialModule, ReactiveFormsModule],
  exports: [
    ProductCardComponent,
    ProductBannerComponent,
    ProductCategoryComponent,
    ProductViewComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
})
export class ProductModule {}
