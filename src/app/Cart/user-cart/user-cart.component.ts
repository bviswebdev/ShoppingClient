import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/Product/Model/product.model';
import { ProductDataService } from 'src/app/Product/Service/productservice.service';

export interface ProductCartData {
  productId: string;
  productCode: string;
  productImageUrl: string;
  productName: string;
  productBrand: string;
  productDescription: string;
  productPrice: number;
  productQtyAvailable: number;
}

type formControlGroup = {
  [key: string]: FormControl;
};

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent implements OnInit {
  prods: Array<ProductCartData> = new Array<ProductCartData>();
  formCartGroup!: FormGroup;
  isFormGroupBuild: boolean = false;

  constructor(private productDataService: ProductDataService) {}

  ngOnInit(): void {
    /*this.quantity = new FormControl('1', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]);*/
    this.subscribeProduct();
  }

  subscribeProduct() {
    this.productDataService
      .getProductsJson()
      .pipe(
        map((prods: Array<Product>) => {
          return prods.map((product) => {
            product.imageUrl = `../../assets/images/${product.code}.jpg`;
            return {
              productId: product._id,
              productCode: product.code,
              productImageUrl: product.imageUrl,
              productName: product.name,
              productBrand: product.brand,
              productDescription: product.description,
              productPrice: product.unitPrice,
              productQtyAvailable: product.quantity,
            };
          });
        }),
        tap((data) => console.log(data))
      )
      .subscribe((transactionList) => {
        this.prods = transactionList;
        let controlGroup: formControlGroup = {};
        this.prods.forEach((prod) => {
          controlGroup[prod.productCode] = new FormControl('1', [
            Validators.required,
            Validators.pattern('^[0-9]+$'),
          ]);
        });
        this.formCartGroup = new FormGroup(controlGroup);
        this.isFormGroupBuild = true;
        console.log(this.formCartGroup);
      });
  }
}

/*
  map((prods: Array<Product>) => {
    return prods.map((product) => {
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
  tap((data) => console.log(data))*/
