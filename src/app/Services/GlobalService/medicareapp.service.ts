import { Injectable } from '@angular/core';
import { Cart } from 'src/app/Cart/Model/cart.model';
import { MedicareApp } from 'src/app/Models/global.model';
import { Order } from 'src/app/Order/Model/order.model';
import { User } from 'src/app/User/Model/user.model';

@Injectable({
  providedIn: 'root',
})
export class MedicareappService {
  medApp: MedicareApp = new MedicareApp();

  constructor() {}

  set setAppUser(val: User) {
    this.medApp.user = val;
  }

  get appUser(): User {
    return this.medApp.user;
  }

  set setAppCart(val: Cart) {
    this.medApp.cart = val;
  }

  get appUserCart(): Cart {
    return this.medApp.cart;
  }

  set setAppUserOrder(val: Order) {
    this.medApp.order = val;
  }

  get appUserOrder(): Order {
    return this.medApp.order;
  }

  setCartToSessionStorage(sessionCart: Cart): void {
    sessionStorage.setItem('medcart', JSON.stringify(sessionCart));
  }

  getCartFromSessionStorage(): Cart | null {
    const sessionCart = sessionStorage.getItem('medcart');
    if (sessionCart) {
      return JSON.parse(sessionCart);
    } else return null;
  }

  resetCartSessionStorage(): void {
    sessionStorage.removeItem('medcart');
  }
}
