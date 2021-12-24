import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductView } from './productview';
import { ProductDataService } from '../../Service/productservice.service';
import { ProductData, Productdatasource } from './productdatasource';
import { productServiceFactory } from './productfactory';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductSnackComponent } from '../product-snack/product-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from 'src/app/Cart/Model/cart.model';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { CartManager } from 'src/app/Cart/user-cart/cart-manager';
import { BlobService } from '../../Service/blob.service';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, map } from 'rxjs/operators';
import { ProductItemData } from '../../Model/product.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  providers: [
    { provide: ProductView, useClass: ProductView },
    {
      provide: Productdatasource,
      useFactory: productServiceFactory,
      deps: [ProductDataService, AuthService, ActivatedRoute, BlobService],
    },
  ],
})
export class ProductViewComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<ProductData>;
  products!: Productdatasource;
  productsDataSource: Array<ProductData> = new Array<ProductData>();
  isAdmin: boolean = false;
  mySubscription: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) productsTable!: MatTable<any>;

  constructor(
    public productDataSource: Productdatasource,
    private router: Router,
    public dialog: MatDialog,
    private addSnackBar: MatSnackBar,
    public authService: AuthService,
    public medAppService: MedicareappService,
    public cartManager: CartManager,
    public domSanitizer: DomSanitizer,
    private productDataService: ProductDataService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.IsAuthenticated && this.authService.IsAdmin) {
      this.isAdmin = true;
    }
    this.products = this.productDataSource;
    this.displayedColumns = this.productDataSource.getDisplayColumnsRoleBased();
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
    this.products.sort = this.sort;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  createNewCart(prodNew: ProductData, isSessionCart: boolean): Cart {
    let cartNew: Cart = new Cart();
    cartNew.userId = isSessionCart ? '' : this.medAppService.appUser._id || '';
    cartNew.grandTotal = Number(prodNew.productPrice);
    let cartNewItemObj: CartItem = new CartItem();
    cartNewItemObj.productId = prodNew.productCode;
    cartNewItemObj.productCount = 1;
    cartNewItemObj.buyingPrice = Number(prodNew.productPrice);
    cartNewItemObj.itemTotal = Number(prodNew.productPrice);
    cartNewItemObj.isAvailable =
      Number(prodNew.productQtyAvailable) > 0 ? true : false;
    //cartItemOnj: CartItem = new CartItem();
    cartNew.cartItems.push(cartNewItemObj);
    return cartNew;
  }

  updateCart(prodEl: ProductData, cartUpdate: Cart): Cart {
    let cartItemUpdateObj: CartItem = new CartItem();
    let cartItemUpdatePrevObj: CartItem = new CartItem();
    cartItemUpdateObj.productId = prodEl.productId;
    cartItemUpdateObj.buyingPrice = Number(prodEl.productPrice);
    cartItemUpdateObj.isAvailable =
      Number(prodEl.productQtyAvailable) > 0 ? true : false;
    cartUpdate.grandTotal = cartUpdate.grandTotal + Number(prodEl.productPrice);
    let cartItemExistsIndex: number = cartUpdate.cartItems.findIndex(
      (item) => item.productId === prodEl.productCode
    );
    if (cartItemExistsIndex !== -1) {
      cartItemUpdatePrevObj = cartUpdate.cartItems[cartItemExistsIndex];
      cartItemUpdateObj.productCount = cartItemUpdatePrevObj.productCount + 1;
      cartItemUpdateObj.itemTotal =
        cartItemUpdatePrevObj.itemTotal + prodEl.productPrice;
      cartUpdate.cartItems.splice(cartItemExistsIndex, 1);
    } else {
      cartItemUpdateObj.productCount = 1;
      cartItemUpdateObj.itemTotal = prodEl.productPrice;
    }
    cartUpdate.cartItems.push(cartItemUpdateObj);
    return cartUpdate;
  }

  addToCart(prodEl: ProductData): void {
    //this.cartManager.handleCart(prodEl);
    if (!this.authService.IsAuthenticated) {
      this.router.navigate(['/medicare/signin']);
    } else {
      this.cartManager.handleCartTemp(prodEl);
    }
    //this.router.navigate(['/customer/cart']);
  }

  openDeleteDialog(prodDelete: ProductData): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: 'Are you sure to delete this product?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productDataService
          .deleteProductJson(prodDelete.productId)
          .pipe(
            map((data: ProductItemData) => {
              return data;
            }),
            catchError((err) => {
              throw 'error in source. Details: ' + err;
            })
          )
          .subscribe(
            (data) => {
              if (data) {
                if (data.statusMsg === 'success') {
                  this.addSnackBar.openFromComponent(ProductSnackComponent, {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    data: 'Product deleted sucessfully!!!',
                  });

                  //this.productsTable.renderRows();
                  //this.ngOnInit();
                  this.router.navigate(['/medicare/viewproducts']);

                  //this.formProductAdd.reset();
                }
              }
            },
            (err) => {
              console.error('Oops:', err.message);
              this.router.navigate(['/apperror']);
            }
          );

        // DO SOMETHING
      }
    });
  }

  viewDetails(viewId: string): void {}

  editProduct(editId: string): void {}
  deleteProduct(deleteId: string): void {}
}
