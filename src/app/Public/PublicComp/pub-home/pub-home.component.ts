import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Product, ProductsData } from 'src/app/Product/Model/product.model';
import { BlobService } from 'src/app/Product/Service/blob.service';
import { ProductDataService } from 'src/app/Product/Service/productservice.service';

@Component({
  selector: 'app-pub-home',
  templateUrl: './pub-home.component.html',
  styleUrls: ['./pub-home.component.scss'],
})
export class PubHomeComponent implements OnInit {
  viewedProducts: Array<Product> = new Array<Product>();
  popularProducts: Array<Product> = new Array<Product>();

  //  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;

  constructor(
    private productDataService: ProductDataService,
    private blogService: BlobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeMvProducts();
    this.subscribeMpProducts();
    //this.subscribeMostViewedProduct();
    //this.subscribeMostPopularProduct();
  }

  ngAfterViewInit() {}

  /*

 
            
            const mimeType = `image/${product.productImage.fileType}`; // e.g., image/png
            let blob = new Blob(product.productImage.fileSource, {
              type: mimeType,
            });
            /*const imageUrlBase64 = `data:${mimeType};base64,${encode(
              product.productImage.fileSource
            )}` return {
              ...product,
            };*/

  private subscribeMvProducts(): void {
    this.productDataService
      .getMostViewedProductsJson()
      .pipe(
        map((productsData: ProductsData) => {
          let productsResData = { ...productsData };
          if (productsResData.data) {
            productsResData.data.map((product) => {
              product.productImage.fileUrl = this.blogService.getBlobUrl(
                product.productImage.fileSource,
                product.productImage.fileType
              );
              return product;
            });
          }
          return productsResData;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe(
        (data) => {
          if (data.statusMsg === 'success') {
            if (data.data) this.viewedProducts = data.data;
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );
  }

  private subscribeMpProducts(): void {
    this.productDataService
      .getMostPurchasedProductsJson()
      .pipe(
        map((productsData: ProductsData) => {
          let productsResData = { ...productsData };
          if (productsResData.data) {
            productsResData.data.map((product) => {
              product.productImage.fileUrl = this.blogService.getBlobUrl(
                product.productImage.fileSource,
                product.productImage.fileType
              );
              return product;
            });
          }
          return productsResData;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe(
        (data) => {
          if (data.statusMsg === 'success') {
            if (data.data) this.popularProducts = data.data;
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );
  }

  /*private subscribeMostViewedProduct(): void {
    this.productDataService
      .getProductsJson()
      .pipe(
        map((products: Array<Product>) => {
          return products.map((product) => {
            product.imageUrl = `../../assets/images/${product.code}.jpg`;
            return product;
          });
        })
      )
      .subscribe((data) => {
        this.viewedProducts = data.slice(0, 5);
      });
  }

  private subscribeMostPopularProduct(): void {
    this.productDataService
      .getProductsJson()
      .pipe(
        map((products: Array<Product>) => {
          return products.map((product) => {
            product.imageUrl = `../../assets/images/${product.code}.jpg`;
            return product;
          });
        })
      )
      .subscribe((data) => {
        this.popularProducts = data.slice(0, 5);
      });
  }*/
}
