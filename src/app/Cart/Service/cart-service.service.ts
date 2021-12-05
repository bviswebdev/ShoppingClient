import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cart } from '../Model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  constructor(private http: HttpClient) {}

  public getOrderJson(): Observable<Cart> {
    return this.http.get<Cart>('assets/json/cartdata.json');
  }
}
