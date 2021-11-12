import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { Product } from '../../Model/product.model';
import { ProductDataService } from '../../Service/productservice.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');
    console.log(productIdFromRoute);
    this.productDataService
      .getProductsJson()
      .pipe(
        tap((data) => console.log(data)),
        map((prods: Array<Product>) =>
          prods.filter((prod) => prod._id === productIdFromRoute)
        ),
        tap((data) => console.log(data))
      )
      .subscribe((data) => {
        this.product = data[0];
        this.product.imageUrl = `../../assets/images/${this.product.code}.jpg`;
        console.log(this.product);
      });

    // Find the product that correspond with the id provided in route.
    //this.product = products.find(product => product.id === productIdFromRoute);
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
