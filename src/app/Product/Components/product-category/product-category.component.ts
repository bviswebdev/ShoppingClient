import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Category, Product } from '../../Model/product.model';
import { ProductDataService } from '../../Service/productservice.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  categories: Array<Category> = new Array<Category>();
  constructor(private productDataService: ProductDataService) {}

  ngOnInit(): void {
    this.subscribeCategory();
  }

  private subscribeCategory(): void {
    this.productDataService
      .getProductsJson()
      .pipe(
        map((products: Array<Product>) =>
          products.map((product) => product.category)
        )
      )
      .subscribe((data) => {
        let resultArr = _.uniqBy(data, (obj) => obj.catName);
        resultArr = _.sortBy(resultArr, 'catName');
        this.categories = resultArr;
      });
  }
}
