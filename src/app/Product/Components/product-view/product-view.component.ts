import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductView } from './productview';
import { ProductDataService } from '../../Service/productservice.service';
import { ProductData, Productdatasource } from './productdatasource';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  providers: [{ provide: ProductView, useClass: ProductView }],
})
export class ProductViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<ProductData>;
  products!: Productdatasource;
  productsDataSource: Array<ProductData> = new Array<ProductData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productDataService: ProductDataService,
    private productView: ProductView
  ) {
    //this.applyRoleDisplayedColumns();
  }

  ngOnInit(): void {
    const productstream$ = this.productDataService.getProductsJson();
    this.products = new Productdatasource(productstream$);
    this.displayedColumns = this.productView.getDisplayColumnsRoleBased();
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
    this.products.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  viewDetails(viewId: string): void {}
  addToCart(productId: string): void {}
  editProduct(editId: string): void {}
  deleteProduct(deleteId: string): void {}
}