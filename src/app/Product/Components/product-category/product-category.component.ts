import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { CategoriesData, Category, Product } from '../../Model/product.model';
import { ProductDataService } from '../../Service/productservice.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  categories: Array<string> = new Array<string>();
  constructor(
    private productDataService: ProductDataService,
    private router: Router
  ) {
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.categories = [];
    //this.subscribeCategory();
    this.subscribeCat();
  }

  private subscribeCat(): void {
    this.productDataService
      .getCategoriesJson()
      .pipe(
        map((categoriesData: CategoriesData) => {
          return categoriesData;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe(
        (data) => {
          if (data.statusMsg === 'success') {
            if (data.data) {
              this.categories = data.data;
            }
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );
  }

  /* private subscribeCategory(): void {
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
        //this.categories = resultArr;
        //.log('categories');
        
      });
  }*/

  goToDetail(val: string): void {
    this.router.navigate([`/view-prod/${val}`]);
  }
}
