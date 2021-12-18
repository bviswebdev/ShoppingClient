import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { Product } from '../../Model/product.model';
import { ProductDataService } from '../../Service/productservice.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('cardData')
  products: Array<Product> = new Array<Product>();

  product: any = {
    _id: '1',
    code: 'PRDABC123DEFX',
    name: 'Paracetamol',
    brand: 'Cipla',
    description: 'An antipyretic medicine used for fever.',
    unitPrice: 18.0,
    quantity: 49,
    isActive: true,
    category: {
      id: '1',
      catName: 'Antipyretics',
      catDesc: 'This is for reducing fever or pyrexia or pyresis',
      catImgUrl: 'CAT_1.png',
      catActive: true,
    },
    supplierId: '2',
    purchases: 0,
    views: 0,
  };

  constructor(
    private productDataService: ProductDataService,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}
}
