import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/User/Model/user.model';
import { Product } from 'src/app/Product/Model/product.model';
import { Cart } from 'src/app/Cart/Model/cart.model';
import { Order } from 'src/app/Order/Model/order.model';

@Injectable()
export class LoaddataService {
  constructor(private http: HttpClient) {}

  public getUsersJson(): Observable<Array<User>> {
    return this.http.get<Array<User>>('assets/json/userdata.json');
  }

  public getProductsJson(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('assets/json/productdata.json');
  }

  public getCartJson(): Observable<Cart> {
    return this.http.get<Cart>('assets/json/cartdata.json');
  }

  public getOrderJson(): Observable<Order> {
    return this.http.get<Order>('assets/json/orderdata.json');
  }

  public async getUsersJsonAsync(): Promise<Observable<User[]>> {
    return this.http.get<Array<User>>('assets/json/userdata.json');
  }

  public async getProductsJsonAsync(): Promise<Observable<Product[]>> {
    return this.http.get<Array<Product>>('assets/json/productdata.json');
  }

  public async getCartJsonAsync(): Promise<Observable<Cart>> {
    return this.http.get<Cart>('assets/json/cartdata.json');
  }

  public async getOrderJsonAsync(): Promise<Observable<Order>> {
    return this.http.get<Order>('assets/json/orderdata.json');
  }
}
