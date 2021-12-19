import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product, ProductsData } from '../Model/product.model';
import { ProductDataService } from './productservice.service';

@Injectable()
export class Productasyncvalidators {
  static createProductBrandValidator(
    productDataService: ProductDataService,
    dpname?: string,
    dpbrand?: string
  ): AsyncValidatorFn {
    console.log(dpname);
    console.log(dpbrand);
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      console.log('inside async brand product');
      console.log(dpname);
      console.log(dpbrand);

      if (
        control.get('productname')?.value === dpname &&
        control.get('brandname')?.value === dpbrand
      ) {
        return of(null);
      }

      return productDataService.getProductsJson().pipe(
        //tap((data) => console.log(data)),
        map((prods: ProductsData) => {
          if (prods.data) {
            prods.data.filter(
              (prod) =>
                prod.name === control.get('productname')?.value &&
                prod.brand === control.get('brandname')?.value
            );
          }
          return prods;
        }),
        tap((data) => console.log(data)),
        map((pd: ProductsData) => {
          return pd.data && pd.data.length > 0
            ? { productBrandExists: true }
            : null;
        }),
        catchError(() => of(null))
        //tap((data) => console.log(data))
      );
    };
  }

  private static pbDefaultValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return of(null);
    };
  }

  static createCategoryValidator(
    productDataService: ProductDataService
  ): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return productDataService.getProductsJson().pipe(
        //tap((data) => console.log(data)),
        map((prods: ProductsData) => {
          if (prods.data) {
            prods.data.filter(
              (prod) => prod.category.catName === control.value
            );
          }
          return prods;
          // prods.filter((prod) => prod.category.catName === control.value)
        }),
        tap((data) => console.log(data)),
        map((pd: ProductsData) => {
          return pd.data && pd.data.length > 0
            ? { categoryNameExists: true }
            : null;
        }),
        catchError(() => of(null))
        //tap((data) => console.log(data))
      );
    };
  }
}
