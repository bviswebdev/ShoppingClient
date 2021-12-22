import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Cart, CartItemData } from '../Model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private readonly cartBaseUri: string = 'http://localhost:8626/api/v1/cart';
  //private myData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  public getOrderJson(): Observable<Cart> {
    return this.http.get<Cart>('assets/json/cartdata.json');
  }

  public getCartJson(userId: string): Observable<CartItemData> {
    return this.http.get<CartItemData>(`${this.cartBaseUri}/${userId}`);
  }

  public postCartJson(cartData: Cart): Observable<CartItemData> {
    const headers = { 'content-type': 'application/json' };

    const body = JSON.stringify(cartData);

    return this.http.post<CartItemData>(`${this.cartBaseUri}`, body, {
      headers: headers,
    });
  }

  public updateCartJson(cartData: Cart): Observable<CartItemData> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(cartData);
    return this.http.patch<CartItemData>(
      `${this.cartBaseUri}/${cartData.userId}`,
      body,
      {
        headers: headers,
      }
    );
  }

  public deleteCartJson(cartData: Cart): Observable<CartItemData> {
    return this.http.delete<CartItemData>(
      `${this.cartBaseUri}/${cartData.userId}`
    );
  }
}
