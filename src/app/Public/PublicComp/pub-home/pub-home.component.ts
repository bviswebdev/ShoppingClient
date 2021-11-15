import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/Product/Model/product.model';
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

  constructor(private productDataService: ProductDataService) {}

  ngOnInit(): void {
    this.subscribeMostViewedProduct();
    this.subscribeMostPopularProduct();
  }

  ngAfterViewInit() {
    //console.log(this.sidenavContainer.scrollable);
  }

  private subscribeMostViewedProduct(): void {
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
  }
}
