import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CategoriesData,
  CategoryCountData,
  Product,
  ProductCountData,
  ProductItemData,
  ProductsData,
} from '../Model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  productBaseUri: string = 'http://localhost:8626/api/v1/product';

  /* http://localhost:8626/api/v1/product/mvproducts
http://localhost:8626/api/v1/product/mpproducts
http://localhost:8626/api/v1/product/categories*/

  constructor(private http: HttpClient) {}

  public getProductsJson(): Observable<ProductsData> {
    return this.http.get<ProductsData>(`${this.productBaseUri}`);
  }

  public getProductItemJson(productId: string): Observable<ProductItemData> {
    return this.http.get<ProductItemData>(
      `${this.productBaseUri}/${productId}`
    );
  }

  public getMostViewedProductsJson(): Observable<ProductsData> {
    return this.http.get<ProductsData>(`${this.productBaseUri}/mvproducts`);
  }

  public getMostPurchasedProductsJson(): Observable<ProductsData> {
    return this.http.get<ProductsData>(`${this.productBaseUri}/mpproducts`);
  }

  public getCategoriesJson(): Observable<CategoriesData> {
    return this.http.get<CategoriesData>(`${this.productBaseUri}/categories`);
  }

  public getProductBrandNameCountJson(
    productName: string,
    productBrand: string
  ): Observable<ProductCountData> {
    return this.http.get<ProductCountData>(
      `${this.productBaseUri}/count?name=${productName}&brand=${productBrand}`
    );
  }

  public getCategoryNameCountJson(
    categoryName: string
  ): Observable<CategoryCountData> {
    return this.http.get<CategoryCountData>(
      `${this.productBaseUri}/categorycount?name=${categoryName}`
    );
  }

  public updateProductJson(productData: Product): Observable<ProductItemData> {
    //const headers = { 'content-type': 'application/json' };

    //const headers = { 'content-type': 'multipart/form-data' };

    const jsonBlob = JSON.stringify(productData);
    let formData: any = new FormData();
    //formData.append('jsonData', jsonBlob);
    if (productData.productImage.fileSource) {
      formData.append('fileSource', productData.productImage.fileSource);
    }
    formData.append('jsonData', jsonBlob);

    //const body = JSON.stringify(productData);

    return this.http.patch<ProductItemData>(
      `${this.productBaseUri}/${productData._id}`,
      formData
    );
  }

  ///path/filename?id=123&option=456

  public postProductJson(productData: Product): Observable<ProductItemData> {
    //const headers = { 'content-type': 'application/json' };

    //const headers = { 'content-type': 'multipart/form-data' };

    const jsonBlob = JSON.stringify(productData);
    let formData: any = new FormData();
    //formData.append('jsonData', jsonBlob);
    formData.append('fileSource', productData.productImage.fileSource);
    formData.append('jsonData', jsonBlob);

    //const body = JSON.stringify(productData);

    return this.http.post<ProductItemData>(`${this.productBaseUri}`, formData);
  }

  public deleteProductJson(productId: string): Observable<ProductItemData> {
    return this.http.delete<ProductItemData>(
      `${this.productBaseUri}/${productId}`
    );
  }
}

/*
{
  headers: headers,
}*/
