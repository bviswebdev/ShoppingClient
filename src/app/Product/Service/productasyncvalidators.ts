import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../Model/product.model';
import { ProductDataService } from './productservice.service';

@Injectable()
export class Productasyncvalidators {
  static createProductBrandValidator(
    productDataService: ProductDataService
  ): AsyncValidatorFn {
    console.log('inside async');
    console.log(productDataService);
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return productDataService.getProductsJson().pipe(
        //tap((data) => console.log(data)),
        map((prods: Array<Product>) =>
          prods.filter(
            (prod) =>
              prod.name === control.get('productname')?.value &&
              prod.brand === control.get('brandname')?.value
          )
        ),
        tap((data) => console.log(data)),
        map((pd: Array<Product>) => {
          return pd && pd.length > 0 ? { productBrandExists: true } : null;
        }),
        catchError(() => of(null))
        //tap((data) => console.log(data))
      );
    };
  }
}
