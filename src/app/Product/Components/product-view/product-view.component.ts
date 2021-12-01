import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductView } from './productview';
import { ProductDataService } from '../../Service/productservice.service';
import { ProductData, Productdatasource } from './productdatasource';
import { productServiceFactory } from './productfactory';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductSnackComponent } from '../product-snack/product-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from 'src/app/Cart/Model/cart.model';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { CartManager } from 'src/app/Cart/user-cart/cart-manager';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  providers: [
    { provide: ProductView, useClass: ProductView },
    {
      provide: Productdatasource,
      useFactory: productServiceFactory,
      deps: [ProductDataService, AuthService, ActivatedRoute],
    },
  ],
})
export class ProductViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<ProductData>;
  products!: Productdatasource;
  productsDataSource: Array<ProductData> = new Array<ProductData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public productDataSource: Productdatasource,
    private router: Router,
    public dialog: MatDialog,
    private addSnackBar: MatSnackBar,
    public authService: AuthService,
    public medAppService: MedicareappService,
    public cartManager: CartManager
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //console.log('hello world');
  }

  ngOnInit(): void {
    this.products = this.productDataSource;
    this.displayedColumns = this.productDataSource.getDisplayColumnsRoleBased();
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
    this.products.sort = this.sort;
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
    cartNew.userId = isSessionCart ? '' : this.authService.UserName;
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
    this.cartManager.handleCartTemp(prodEl);
  }

  openDeleteDialog(prodDelete: ProductData): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: 'Are you sure to delete this product?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Yes clicked');
        console.log(prodDelete);
        // DO SOMETHING
        this.addSnackBar.openFromComponent(ProductSnackComponent, {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          data: 'Product deleted sucessfully!!!',
        });
      }
    });
  }

  viewDetails(viewId: string): void {}

  editProduct(editId: string): void {}
  deleteProduct(deleteId: string): void {}
}
