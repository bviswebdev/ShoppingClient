import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { Category, Product, ProductsData } from '../../Model/product.model';
import { BlobService } from '../../Service/blob.service';

export interface ProductData {
  productId: string;
  productCode: string;
  productImageUrl: string;
  productName: string;
  productBrand: string;
  productPrice: number;
  productQtyAvailable: number;
  productDescription: string;
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
    transactions: Observable<ProductsData>,
    public authService: AuthService,
    categoryId: string | null,
    private blogService: BlobService
  ) {
    super();
    this.transactions$ = transactions
      .pipe(
        map((productsData: ProductsData) => {
          let productsResData = { ...productsData };
          if (categoryId) {
            if (productsResData.data) {
              productsResData.data = productsResData.data.filter(
                (prod) => prod.category.catName === categoryId
              );

              return productsResData;
            }
          }
          return productsResData;
        }),
        map((prods: ProductsData) => {
          let productsResData: Array<ProductData> = new Array<ProductData>();
          let productsResDataMap: Array<Product> = new Array<Product>();
          if (prods.data) {
            productsResDataMap = [...prods.data];
          }

          productsResDataMap.forEach((product) => {
            product.productImage.fileUrl = this.blogService.getBlobUrl(
              product.productImage.fileSource,
              product.productImage.fileType
            );
            let productData: ProductData = {
              productId: product._id,
              productCode: product.code,
              productImageUrl: product.productImage.fileUrl,
              productName: product.name,
              productBrand: product.brand,
              productPrice: product.unitPrice,
              productQtyAvailable: product.quantity,
              productDescription: product.description,
            };
            productsResData.push(productData);
          });

          return {
            statusMsg: prods.statusMsg,
            data: productsResData,
          };
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe(
        (data) => {
          if (data.statusMsg === 'success') {
            if (data.data) {
              this.data = data.data;
            }
          }
        },
        (err) => {
          console.error('Oops:', err.message);
        }
      );
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

    return dpColumns;
  }
}

/*
this.transactions$ = transactions
.pipe(
  map((products: Array<Product>) => {
    if (categoryId) {
      return products.filter((prod) => prod.category._id === categoryId);
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
        productDescription: product.description,
      };
    });
  }),
  
)
.subscribe((transactionList) => {
  this.data = transactionList;
});*/
