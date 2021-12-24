import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  CategoryCountData,
  Product,
  ProductCountData,
  ProductsData,
} from '../Model/product.model';
import { ProductDataService } from './productservice.service';

@Injectable()
export class Productasyncvalidators {
  static createProductBrandValidator(
    productDataService: ProductDataService,
    dpname?: string,
    dpbrand?: string
  ): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (
        control.get('productname')?.value === dpname &&
        control.get('brandname')?.value === dpbrand
      ) {
        return of(null);
      }

      return productDataService
        .getProductBrandNameCountJson(
          control.get('productname')?.value,
          control.get('brandname')?.value
        )
        .pipe(
          map((pd: ProductCountData) => {
            return pd.statusMsg === 'success' && pd.data && pd.data > 0
              ? { productBrandExists: true }
              : null;
          }),
          catchError(() => of(null))
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
      return productDataService.getCategoryNameCountJson(control.value).pipe(
        map((pd: CategoryCountData) => {
          return pd.statusMsg === 'success' && pd.data && pd.data > 0
            ? { categoryNameExists: true }
            : null;
        }),
        catchError(() => of(null))
      );
    };
  }
}
