import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/Product/Model/product.model';
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
          //tap((data) => console.log(data)),
          map((prods: Array<Product>) =>
            prods.filter((prod) => prod.category._id === labelId)
          ),
          tap((data) => console.log(data))
        )
        .subscribe(
          (data) => {
            retStr = data[0].category.catName;
            if (retStr) {
              resolve(retStr);
            } else {
              reject('Name not found');
            }
          },
          (err) => reject(err)
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
        .getProductsJson()
        .pipe(
          //tap((data) => console.log(data)),
          map((prods: Array<Product>) =>
            prods.filter((prod) => prod._id === labelId)
          ),
          tap((data) => console.log(data))
        )
        .subscribe(
          (data) => {
            retStr = data[0].name;

            if (retStr) {
              resolve(retStr);
            } else {
              reject('Name not found');
            }
          },
          (err) => reject(err)
        );
    });
  }
}
