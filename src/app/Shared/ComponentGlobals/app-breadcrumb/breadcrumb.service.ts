import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import {
  Product,
  ProductItemData,
  ProductsData,
} from 'src/app/Product/Model/product.model';
import { ProductDataService } from 'src/app/Product/Service/productservice.service';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  constructor(private productDataService: ProductDataService) {}

  public async getCategoryNameById(
    labelId: string,
    labelKey: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let retStr = '';
      this.productDataService
        .getProductsJson()
        .pipe(
          map((prods: ProductsData) => {
            if (prods.data) {
              prods.data.filter((prod) => prod.category._id === labelId);
            }
            return prods;
          }),
          catchError((err) => {
            throw 'error in source. Details: ' + err;
          })
        )
        .subscribe(
          (data) => {
            if (data.statusMsg === 'success') {
              if (data.data) {
                retStr = data.data[0].category.catName;
              }
            }
            if (retStr) {
              resolve(retStr);
            } else {
              reject('Name not found');
            }
          },
          (err) => {
            console.error('Oops:', err.message);
            reject(err);
          }
        );
    });
  }

  public async getProductNameById(
    labelId: string,
    labelKey: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let retStr = '';
      this.productDataService
        .getProductItemJson(labelId)
        .pipe(
          map((prod: ProductItemData) => {
            return prod;
          }),
          catchError((err) => {
            throw 'error in source. Details: ' + err;
          })
        )
        .subscribe(
          (data) => {
            if (data.statusMsg === 'success') {
              if (data.data) {
                retStr = data.data.name;
              }
            }

            if (retStr) {
              resolve(retStr);
            } else {
              reject('Name not found');
            }
          },

          (err) => {
            console.error('Oops:', err.message);
            reject(err);
          }
        );
    });
  }
}
