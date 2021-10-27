import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/Models/cart.model';
import { Order } from 'src/app/Models/order.model';
import { Product } from 'src/app/Models/product.model';
import { User } from 'src/app/Models/user.model';
import { LoaddataService } from 'src/app/Services/TestDataService/loaddata.service';

@Injectable()
export class Loadtestdata {
  users: Observable<Array<User>> = new Observable<Array<User>>();
  products: Observable<Array<Product>> = new Observable<Array<Product>>();
  cart: Observable<Cart> = new Observable<Cart>();
  order: Observable<Order> = new Observable<Order>();
  showData: any = {
    user: false,
    product: false,
    cart: false,
    order: false,
  };

  constructor(private dataService: LoaddataService) {}

  loadSampleData(dataVal: string): void {
    switch (dataVal) {
      case 'user':
        this.users = this.dataService.getUsersJson();
        this.showData = {
          ...this.showData,
          user: true,
        };
        break;
      case 'product':
        this.products = this.dataService.getProductsJson();
        this.showData = {
          ...this.showData,
          product: true,
        };
        break;

      case 'cart':
        this.cart = this.dataService.getCartJson();
        this.showData = {
          ...this.showData,
          cart: true,
        };
        break;

      case 'order':
        this.order = this.dataService.getOrderJson();
        this.showData = {
          ...this.showData,
          order: true,
        };
        break;

      default:
        this.showData = { ...this.showData };
    }
  }
}
