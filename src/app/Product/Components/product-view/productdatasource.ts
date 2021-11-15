import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { Category, Product } from '../../Model/product.model';

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
  viewColumns: string[] = [];
  allColumns: string[] = [
    'productImageUrl',
    'productName',
    'productBrand',
    'productPrice',
    'productQtyAvailable',
    'view',
    'cart',
    'edit',
    'delete',
  ];

  publicRemoveColumns: string[] = ['edit', 'delete'];
  adminRemoveColumns: string[] = ['cart'];
  userRemoveColumns: string[] = ['edit', 'delete'];
  private productDataSource: ProductData[] = [];

  private transactions$: Subscription;

  constructor(
    transactions: Observable<Array<Product>>,
    public authService: AuthService,
    categoryId: string | null
  ) {
    super();
    this.transactions$ = transactions
      .pipe(
        map((products: Array<Product>) => {
          if (categoryId) {
            return products.filter((prod) => prod.category.id === categoryId);
          }
          return products;
        }),
        map((prods: Array<Product>) => {
          return prods.map((product) => {
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

  public getDisplayColumnsRoleBased(): string[] {
    this.applyRoleDisplayedColumns();
    return this.viewColumns;
  }

  private applyRoleDisplayedColumns() {
    if (this.authService.IsAuthenticated && this.authService.IsUser) {
      this.viewColumns = this.filterDisplayedColumns(
        this.allColumns,
        this.userRemoveColumns
      );
    } else if (this.authService.IsAuthenticated && this.authService.IsAdmin) {
      this.viewColumns = this.filterDisplayedColumns(
        this.allColumns,
        this.adminRemoveColumns
      );
    } else {
      this.viewColumns = this.filterDisplayedColumns(
        this.allColumns,
        this.publicRemoveColumns
      );
    }
  }

  private filterDisplayedColumns(
    dpColumns: string[],
    rmCol: string[]
  ): string[] {
    rmCol.forEach((e, i, f) => {
      dpColumns.splice(dpColumns.indexOf(e), 1);
    });

    //console.log(dpColumns);

    return dpColumns;
  }
}
