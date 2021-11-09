import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  constructor(private http: HttpClient) {}

  public getProductsJson(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('assets/json/productdata.json');
  }
}
