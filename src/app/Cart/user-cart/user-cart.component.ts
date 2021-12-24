import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Order } from 'src/app/Order/Model/order.model';
import { Product, ProductItemData } from 'src/app/Product/Model/product.model';
import { BlobService } from 'src/app/Product/Service/blob.service';
import { ProductDataService } from 'src/app/Product/Service/productservice.service';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { Address } from 'src/app/User/Model/user.model';
import { Cart, CartItem, CartItemData } from '../Model/cart.model';
import { CartServiceService } from '../Service/cart-service.service';
import { CartManager } from './cart-manager';

export interface ProductCartData {
  productId: string;
  productCode: string;
  productImageUrl: string;
  productName: string;
  productBrand: string;
  productDescription: string;
  productPrice: number;
  productQtyAvailable: number;
}

type formControlGroup = {
  [key: string]: FormControl;
};

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent implements OnInit {
  prods: Array<ProductCartData> = new Array<ProductCartData>();
  formCartGroup!: FormGroup;
  isFormGroupBuild: boolean = false;
  isCartEmpty: boolean = true;
  isCartDataLoaded: boolean = false;
  userCart: Cart = new Cart();

  constructor(
    private productDataService: ProductDataService,
    public medAppService: MedicareappService,
    public cartManager: CartManager,
    private router: Router,
    private blobService: BlobService,
    private cartService: CartServiceService,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    /*this.quantity = new FormControl('1', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]);*/
    this.userCart = this.medAppService.appUserCart;
    if (this.userCart.cartItems.length > 0) {
      let controlGroup: formControlGroup = {};

      this.userCart.cartItems.forEach((cartItem) => {
        controlGroup[cartItem.productId] = new FormControl(
          cartItem.productCount.toString(),
          [Validators.required, Validators.pattern('^[0-9]+$')]
        );
        //start

        //end
      });
      this.formCartGroup = new FormGroup(controlGroup);

      const cartItemObservable = from(this.userCart.cartItems);

      cartItemObservable
        .pipe(
          concatMap((cItem) => {
            return this.productDataService
              .getProductItemJson(cItem.productId)
              .pipe(
                map((product: ProductItemData) => {
                  if (product.data) {
                    product.data.productImage.fileUrl =
                      this.blobService.getBlobUrl(
                        product.data.productImage.fileSource,
                        product.data.productImage.fileType
                      );
                  }
                  return product;
                }),
                catchError((err) => {
                  throw 'error in source. Details: ' + err;
                })
              );
          })
        )
        .subscribe(
          (data) => {
            if (data.statusMsg === 'success') {
              if (data.data) {
                let cartItemIndex: number = this.userCart.cartItems.findIndex(
                  (item) => item.productId === data.data?._id
                );
                if (cartItemIndex !== -1) {
                  this.userCart.cartItems[
                    cartItemIndex
                  ].cartItemProduct.productImageUrl =
                    data.data?.productImage.fileUrl;
                }
              }
            }
          },
          (err) => {
            console.error('Oops:', err.message);
            this.router.navigate(['/apperror']);
          },
          () => {
            this.isCartDataLoaded = true;
          }
        );

      /*this.formCartGroup.valueChanges.subscribe((x) => {
        
      });*/
      /* this.userCart.cartItems.forEach((item) => {
        this.formCartGroup.get(item.productId)?.valueChanges.subscribe((x) => {
          
        });
      });*/

      this.isCartEmpty = false;
      this.isFormGroupBuild = true;
    }

    //this.subscribeProduct();
  }

  cartCheckout() {
    this.medAppService.setAppUserOrder = new Order();
    this.router.navigate(['/customer/checkout']);
  }

  updateCart(cartUpdateItem: CartItem) {
    if (
      cartUpdateItem.productCount ===
      this.formCartGroup.controls[cartUpdateItem.productId].value
    ) {
      return;
    } else {
      this.userCart = this.cartManager.updateCartItem(
        cartUpdateItem,
        this.userCart,
        this.formCartGroup.controls[cartUpdateItem.productId].value
      );

      this.cartService
        .updateCartJson(this.userCart)
        .pipe(
          map((data: CartItemData) => {
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
                this.medAppService.setAppCart = this.userCart;
                //this.router.navigate(['/customer/cart']);
              }
            }
          },
          (err) => {
            console.error('Oops:', err.message);
            this.router.navigate(['/apperror']);
          }
        );
    }
  }

  deleteCart(cartDeleteItem: CartItem) {
    if (this.userCart.cartItems.length > 1) {
      this.userCart = this.cartManager.deleteCartItem(
        cartDeleteItem,
        this.userCart
      );

      this.cartService
        .updateCartJson(this.userCart)
        .pipe(
          map((data: CartItemData) => {
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
                this.medAppService.setAppCart = this.userCart;
                //this.router.navigate(['/customer/cart']);
              }
            }
          },
          (err) => {
            console.error('Oops:', err.message);
            this.router.navigate(['/apperror']);
          }
        );
    } else {
      this.cartService
        .deleteCartJson(this.userCart)
        .pipe(
          map((data: CartItemData) => {
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
                this.medAppService.setAppCart = new Cart();
                this.isCartEmpty = true;
                //this.router.navigate(['/customer/cart']);
              }
            }
          },
          (err) => {
            console.error('Oops:', err.message);
            this.router.navigate(['/apperror']);
          }
        );
    }
  }
}

/*
  subscribeCartItemProduct(productId: string): Observable<Array<Product>> {
    return this.productDataService.getProductsJson().pipe(
      map((products: Array<Product>) => {
        return products.filter((prod) => prod.code === productId);
      })
    );
  }*/

/*
  subscribeProduct() {
    this.productDataService
      .getProductsJson()
      .pipe(
        map((prods: Array<Product>) => {
          return prods.map((product) => {
            product.imageUrl = `../../assets/images/${product.code}.jpg`;
            return {
              productId: product._id,
              productCode: product.code,
              productImageUrl: product.imageUrl,
              productName: product.name,
              productBrand: product.brand,
              productDescription: product.description,
              productPrice: product.unitPrice,
              productQtyAvailable: product.quantity,
            };
          });
        }),
        
      )
      .subscribe((transactionList) => {
        this.prods = transactionList;
        let controlGroup: formControlGroup = {};
        this.prods.forEach((prod) => {
          controlGroup[prod.productCode] = new FormControl('1', [
            Validators.required,
            Validators.pattern('^[0-9]+$'),
          ]);
        });
        this.formCartGroup = new FormGroup(controlGroup);
        this.isFormGroupBuild = true;
        
      });
  }
}*/

/*
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
  */
