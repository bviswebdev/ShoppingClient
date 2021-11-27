import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductView } from './productview';
import { ProductDataService } from '../../Service/productservice.service';
import { ProductData, Productdatasource } from './productdatasource';
import { productServiceFactory } from './productfactory';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductSnackComponent } from '../product-snack/product-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  providers: [
    { provide: ProductView, useClass: ProductView },
    {
      provide: Productdatasource,
      useFactory: productServiceFactory,
      deps: [ProductDataService, AuthService, ActivatedRoute],
    },
  ],
})
export class ProductViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<ProductData>;
  products!: Productdatasource;
  productsDataSource: Array<ProductData> = new Array<ProductData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public productDataSource: Productdatasource,
    private router: Router,
    public dialog: MatDialog,
    private addSnackBar: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //console.log('hello world');
  }

  ngOnInit(): void {
    this.products = this.productDataSource;
    this.displayedColumns = this.productDataSource.getDisplayColumnsRoleBased();
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

  openDeleteDialog(prodDelete: ProductData): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: 'Are you sure to delete this product?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Yes clicked');
        console.log(prodDelete);
        // DO SOMETHING
        this.addSnackBar.openFromComponent(ProductSnackComponent, {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          data: 'Product deleted sucessfully!!!',
        });
      }
    });
  }

  viewDetails(viewId: string): void {}
  addToCart(productId: string): void {}
  editProduct(editId: string): void {}
  deleteProduct(deleteId: string): void {}
}
