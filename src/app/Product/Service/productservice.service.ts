import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductsData } from '../Model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  productBaseUri: string = 'http://localhost:8626/api/v1/product';

  /* http://localhost:8626/api/v1/product/mvproducts
http://localhost:8626/api/v1/product/mpproducts
http://localhost:8626/api/v1/product/categories*/

  constructor(private http: HttpClient) {}

  public getProductsJson(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('assets/json/productdata.json');
  }

  public getMostViewedProductsJson(): Observable<ProductsData> {
    return this.http.get<ProductsData>(`${this.productBaseUri}/mvproducts`);
  }

  public getMostPurchasedProductsJson(): Observable<ProductsData> {
    return this.http.get<ProductsData>(`${this.productBaseUri}/mpproducts`);
  }

  public getCategoriesJson(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.productBaseUri}/categories`);
  }
}
