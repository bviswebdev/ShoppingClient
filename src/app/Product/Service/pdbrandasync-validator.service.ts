import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product, ProductsData } from '../Model/product.model';
import { ProductDataService } from './productservice.service';

@Injectable({
  providedIn: 'root',
})
export class PdbrandasyncValidator implements AsyncValidator {
  productService: ProductDataService;
  constructor(productDataService: ProductDataService) {
    this.productService = productDataService;
  }

  //https://medium.com/@rinciarijoc/angular-custom-async-validators-13a648d688d8

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.productService.getProductsJson().pipe(
      map((prods: ProductsData) => {
        if (prods.data) {
          prods.data.filter(
            (prod) =>
              prod.name === ctrl.get('productname')?.value &&
              prod.brand === ctrl.get('brandname')?.value
          );
        }
        return prods;
      }),

      map((pd: ProductsData) => {
        return pd.data && pd.data.length > 0
          ? { productBrandExists: true }
          : null;
      }),
      catchError(() => of(null))
    );
  }
}
