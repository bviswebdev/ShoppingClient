import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { CartManager } from 'src/app/Cart/user-cart/cart-manager';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { Product } from '../../Model/product.model';
import { ProductDataService } from '../../Service/productservice.service';
import { ProductData } from '../product-view/productdatasource';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productDataService: ProductDataService,
    public authService: AuthService,
    private router: Router,
    public cartManager: CartManager
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');
    console.log(productIdFromRoute);
    this.productDataService
      .getProductsJson()
      .pipe(
        //tap((data) => console.log(data)),
        map((prods: Array<Product>) =>
          prods.filter((prod) => prod._id === productIdFromRoute)
        )
        //tap((data) => console.log(data))
      )
      .subscribe((data) => {
        this.product = data[0];
        this.product.imageUrl = `../../assets/images/${this.product.code}.jpg`;
        //console.log(this.product);
      });

    // Find the product that correspond with the id provided in route.
    //this.product = products.find(product => product.id === productIdFromRoute);
  }

  addToCart(prodData: Product): void {
    //this.cartManager.handleCart(prodEl);
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
    this.router.navigate(['/customer/cart']);
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
        tap((data) => console.log(data))
      )
      .subscribe((transactionList) => {
        this.data = transactionList;
      });*/
}
