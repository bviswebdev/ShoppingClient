import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../../Model/product.model';

export interface ProductData {
  productId: string;
  productCode: string;
  productImageUrl: string;
  productName: string;
  productBrand: string;
  productPrice: number;
  productQtyAvailable: number;
}

export class Productdatasource extends MatTableDataSource<ProductData> {
  private productDataSource: ProductData[] = [];

  private transactions$: Subscription;

  constructor(transactions: Observable<Array<Product>>) {
    super();
    this.transactions$ = transactions
      .pipe(
        map((products: Array<Product>) => {
          return products.map((product) => {
            product.imageUrl = `../../assets/images/${product.code}.jpg`;
            return {
              productId: product._id,
              productCode: product.code,
              productImageUrl: product.imageUrl,
              productName: product.name,
              productBrand: product.brand,
              productPrice: product.unitPrice,
              productQtyAvailable: product.quantity,
            };
          });
        }),
        tap((data) => console.log(data))
      )
      .subscribe((transactionList) => {
        this.data = transactionList;
      });
  }

  disconnect() {
    this.transactions$.unsubscribe();
    super.disconnect();
  }
}
