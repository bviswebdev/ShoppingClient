import { Injectable } from '@angular/core';
import { ProductData } from 'src/app/Product/Components/product-view/productdatasource';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';
import { Cart, CartItem, CartItemProduct } from '../Model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartManager {
  constructor(
    public authService: AuthService,
    public medAppService: MedicareappService
  ) {}

  handleCartTemp(prodEl: ProductData): boolean {
    let cartObj: Cart = new Cart();
    if (!this.medAppService.medApp.cart) {
      cartObj = this.createNewCart(prodEl, false);
      console.log(this.medAppService.medApp.cart);
    } else {
      cartObj = this.medAppService.medApp.cart;
      cartObj = this.updateCart(prodEl, cartObj);
    }
    this.medAppService.medApp.cart = cartObj;
    return true;
  }

  handleCart(prodEl: ProductData): boolean {
    if (this.authService.IsAuthenticated && this.authService.IsUser) {
      let cartObj: Cart = new Cart();
      if (!this.medAppService.medApp.cart) {
        cartObj = this.createNewCart(prodEl, false);
        console.log(this.medAppService.medApp.cart);
      } else {
        cartObj = this.medAppService.medApp.cart;
        cartObj = this.updateCart(prodEl, cartObj);
      }
      this.medAppService.medApp.cart = cartObj;
    } else {
      let cartSessionObj: Cart = new Cart();
      if (!this.medAppService.getCartFromSessionStorage()) {
        cartSessionObj = this.createNewCart(prodEl, true);
      } else {
        let cartSession = this.medAppService.getCartFromSessionStorage();
        if (cartSession) {
          cartSessionObj = cartSession;
        }
        cartSessionObj = this.updateCart(prodEl, cartSessionObj);
      }
      this.medAppService.resetCartSessionStorage();
      this.medAppService.setCartToSessionStorage(cartSessionObj);
      console.log(cartSessionObj);
    }
    return true;
  }

  updateCart(prodEl: ProductData, cartUpdate: Cart): Cart {
    let cartItemUpdateObj: CartItem = new CartItem();
    let cartItemUpdatePrevObj: CartItem = new CartItem();
    cartItemUpdateObj.productId = prodEl.productCode;
    cartItemUpdateObj.buyingPrice = Number(prodEl.productPrice);
    cartItemUpdateObj.isAvailable =
      Number(prodEl.productQtyAvailable) > 0 ? true : false;
    cartUpdate.grandTotal = cartUpdate.grandTotal + Number(prodEl.productPrice);
    let cartItemExistsIndex: number = cartUpdate.cartItems.findIndex(
      (item) => item.productId === prodEl.productCode
    );
    console.log(cartItemExistsIndex);
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
    let cartItemProductData: CartItemProduct = new CartItemProduct();
    cartItemProductData.productCode = prodEl.productCode;
    cartItemProductData.productBrand = prodEl.productBrand;
    cartItemProductData.productDescription = prodEl.productDescription;
    cartItemProductData.productImageUrl = prodEl.productImageUrl;
    cartItemProductData.productName = prodEl.productName;
    cartItemProductData.productPrice = prodEl.productPrice;
    cartItemProductData.productQtyAvailable = prodEl.productQtyAvailable;
    cartItemUpdateObj.cartItemProduct = cartItemProductData;
    cartUpdate.cartItems.push(cartItemUpdateObj);
    return cartUpdate;
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
    let cartItemProductData: CartItemProduct = new CartItemProduct();
    cartItemProductData.productCode = prodNew.productCode;
    cartItemProductData.productBrand = prodNew.productBrand;
    cartItemProductData.productDescription = prodNew.productDescription;
    cartItemProductData.productImageUrl = prodNew.productImageUrl;
    cartItemProductData.productName = prodNew.productName;
    cartItemProductData.productPrice = prodNew.productPrice;
    cartItemProductData.productQtyAvailable = prodNew.productQtyAvailable;
    cartNewItemObj.cartItemProduct = cartItemProductData;
    //cartItemOnj: CartItem = new CartItem();
    cartNew.cartItems.push(cartNewItemObj);
    return cartNew;
  }
}
