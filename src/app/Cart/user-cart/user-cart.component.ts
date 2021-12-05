import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/Product/Model/product.model';
import { ProductDataService } from 'src/app/Product/Service/productservice.service';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { Cart, CartItem } from '../Model/cart.model';
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
  userCart: Cart = new Cart();

  constructor(
    private productDataService: ProductDataService,
    public medAppService: MedicareappService,
    public cartManager: CartManager,
    private router: Router
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
      });
      this.formCartGroup = new FormGroup(controlGroup);
      /*this.formCartGroup.valueChanges.subscribe((x) => {
        console.log('firstname value changed');
        console.log(x);
      });*/
      /* this.userCart.cartItems.forEach((item) => {
        this.formCartGroup.get(item.productId)?.valueChanges.subscribe((x) => {
          console.log('firstname value changed');
          console.log(x);
        });
      });*/
      this.isCartEmpty = false;
      this.isFormGroupBuild = true;
    }

    //this.subscribeProduct();
  }

  cartCheckout() {
    this.router.navigate(['/customer/checkout']);
  }

  updateCart(cartUpdateItem: CartItem) {
    console.log('indise update');
    console.log(cartUpdateItem);

    console.log(this.formCartGroup.controls[cartUpdateItem.productId]);
    console.log(this.userCart);
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
      console.log(this.userCart);
      this.medAppService.setAppCart = this.userCart;
    }
  }

  deleteCart(cartDeleteItem: CartItem) {
    console.log('indise delete');
    console.log(cartDeleteItem);
    this.userCart = this.cartManager.deleteCartItem(
      cartDeleteItem,
      this.userCart
    );
    console.log(this.userCart);
    if (this.userCart.cartItems.length === 0) {
      this.isCartEmpty = true;
    }
    this.medAppService.setAppCart = this.userCart;
  }

  subscribeCartItemProduct(productId: string): Observable<Array<Product>> {
    return this.productDataService.getProductsJson().pipe(
      map((products: Array<Product>) => {
        return products.filter((prod) => prod.code === productId);
      })
    );
  }

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
        tap((data) => console.log(data))
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
        console.log(this.formCartGroup);
      });
  }
}

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
  tap((data) => console.log(data))*/
