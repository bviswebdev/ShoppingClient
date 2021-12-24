import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { CartManager } from 'src/app/Cart/user-cart/cart-manager';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { Product, ProductItemData } from '../../Model/product.model';
import { BlobService } from '../../Service/blob.service';
import { ProductDataService } from '../../Service/productservice.service';
import { ProductData } from '../product-view/productdatasource';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  productIdFromRoute: string = '';

  constructor(
    private route: ActivatedRoute,
    private productDataService: ProductDataService,
    public authService: AuthService,
    private router: Router,
    public cartManager: CartManager,
    private blogService: BlobService,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = routeParams.get('productId') || '';

    this.productDataService
      .getProductItemJson(this.productIdFromRoute)
      .pipe(
        map((product: ProductItemData) => {
          if (product.data) {
            product.data.productImage.fileUrl = this.blogService.getBlobUrl(
              product.data.productImage.fileSource,
              product.data.productImage.fileType
            );
          }
          return product;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe(
        (data) => {
          if (data.statusMsg === 'success') {
            if (data.data) this.product = data.data;
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );

    // Find the product that correspond with the id provided in route.
    //this.product = products.find(product => product.id === productIdFromRoute);
  }

  addToCart(prodData: Product): void {
    //this.cartManager.handleCart(prodEl);

    if (!this.authService.IsAuthenticated) {
      this.router.navigate(['/medicare/signin']);
    } else {
      let prodEl: ProductData = {
        productId: '',
        productCode: '',
        productDescription: '',
        productBrand: '',
        productImageUrl: '',
        productName: '',
        productPrice: 0,
        productQtyAvailable: 0,
      };
      prodEl.productId = prodData._id;
      prodEl.productCode = prodData.code;
      prodEl.productDescription = prodData.description;
      prodEl.productBrand = prodData.brand;
      prodEl.productImageUrl = prodData.imageUrl;
      prodEl.productName = prodData.name;
      prodEl.productPrice = prodData.unitPrice;
      prodEl.productQtyAvailable = prodData.quantity;
      this.cartManager.handleCartTemp(prodEl);
      /* productId: string;
    productCode: string;
    productImageUrl: string;
    productName: string;
    productBrand: string;
    productPrice: number;
    productQtyAvailable: number;
    productDescription: string;*/
      //this.router.navigate(['/customer/cart']);
    }
  }

  /*.pipe(
        map((products: Array<Product>) => {
          return products.map((product) => {
            product.imageUrl = `../../assets/images/${product.code}.jpg`;
            return {
              productId: product._id,
              productCode: product.code,
              productImageUrl: product.imageUrl,
              productName: product.name,
              productBrand: product.brand,
              productPrice: product.unitPrice,
              productQtyAvailable: product.quantity,
            };
          });
        }),
        
      )
      .subscribe((transactionList) => {
        this.data = transactionList;
      });*/
}
