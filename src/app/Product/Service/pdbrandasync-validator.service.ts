import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../Model/product.model';
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
    console.log('inside async');
    console.log(this.productService);
    return this.productService.getProductsJson().pipe(
      //tap((data) => console.log(data)),
      map((prods: Array<Product>) =>
        prods.filter(
          (prod) =>
            prod.name === ctrl.get('productname')?.value &&
            prod.brand === ctrl.get('brandname')?.value
        )
      ),
      tap((data) => console.log(data)),
      map((pd: Array<Product>) => {
        return pd && pd.length > 0 ? { productBrandExists: true } : null;
      }),
      catchError(() => of(null))
      //tap((data) => console.log(data))
    );
  }
}
