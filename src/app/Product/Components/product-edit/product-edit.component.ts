import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import {
  CategoriesData,
  Category,
  Product,
  ProductItemData,
} from '../../Model/product.model';
import { DtsErrorStateMatcher } from '../../Service/errorstatematcher';
import { PdbrandasyncValidator } from '../../Service/pdbrandasync-validator.service';
import { Productasyncvalidators } from '../../Service/productasyncvalidators';
import { ProductDataService } from '../../Service/productservice.service';
import {
  fileFormatValidator,
  fileSizeValidator,
} from '../../Service/productsyncvalidators';
import { ProductAddcategoryComponent } from '../product-addcategory/product-addcategory.component';
import { ProductSnackComponent } from '../product-snack/product-snack.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  formProductEdit!: FormGroup;
  public formSubmitAttempt!: boolean;
  public fileUploadAttempt!: boolean;
  fileName = '';
  selectMatcher = new DtsErrorStateMatcher();
  categories: Array<string> = new Array<string>();
  public productObj: Product = new Product();
  public selectedCategory: string = '';
  defalutProductName: string = '';
  defaultBrandName: string = '';
  productIdFromRoute: string = '';
  categoryDesc: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private pdbrndValidator: PdbrandasyncValidator,
    private productDataService: ProductDataService,
    public dialog: MatDialog,
    private addSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    this.productIdFromRoute = routeParams.get('productId') || '';
    this.pdbrndValidator.productService = this.productDataService;
    this.formProductEdit = this.fb.group(
      {
        productname: ['', [Validators.required, Validators.maxLength(30)]],
        brandname: ['', [Validators.required, Validators.maxLength(30)]],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
          ],
        ],
        unitprice: [
          '',
          [
            Validators.required,
            //Validators.pattern(/^[0-9]+\.[0-9]{2}$/),
            Validators.pattern('^([0-9]+|[0-9]+.[0-9]{1,2})$'),
          ],
        ],
        quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        filesource: ['', [fileFormatValidator, fileSizeValidator]],
        fileupload: [''],
        category: ['', [Validators.required]],
      },
      {
        validators: null,
        /* asyncValidators: Productasyncvalidators.createProductBrandValidator(
          this.productDataService,
          this.defalutProductName,
          this.defaultBrandName
        ),*/

        updateOn: 'blur',
      }
    );
    this.categories = [];
    //this.subscribeCategory();
    //this.subscribeProduct();
    //this.forkProductAndCategory();
    this.forkProductAndCategoryNew();
  }

  buildForm() {}

  openDialog() {
    let dialogRef = this.dialog.open(ProductAddcategoryComponent, {
      height: '350px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.categoryname) {
        this.categories.push(result.categoryname);
        this.categoryDesc = result.description;
        /*let categoryTemp: Category = new Category();
        categoryTemp.catName = result.categoryname;
        categoryTemp.catDesc = result.description;
        this.categories.push(categoryTemp);*/
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.formProductEdit.patchValue({
        filesource: file,
      });
    }

    this.fileUploadAttempt = true;

    /*if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }*/
  }

  private forkProductAndCategoryNew(): void {
    forkJoin([
      this.forkSubscribeCategoryNew(),
      this.forkSubscribeProductNew(this.productIdFromRoute),
    ]).subscribe(
      (res) => {
        if (res[0]) {
          /*let resultArr = _.uniqBy(res[0], (obj) => obj.catName);
          resultArr = _.sortBy(resultArr, 'catName');*/
          if (res[0].statusMsg === 'success') {
            if (res[0].data) {
              this.categories = res[0].data;
            }
          }
        }
        if (res[1] && res[1].data) {
          this.productObj = res[1].data;

          this.fileName = this.productObj.productImage.fileName || '';
          this.defalutProductName = this.productObj.name;
          this.defaultBrandName = this.productObj.brand;
          this.productObj.productImage.fileSource = {};
          // this.buildForm();
          this.formProductEdit.patchValue({
            productname: this.productObj.name,
            brandname: this.productObj.brand,
            description: this.productObj.description,
            unitprice: this.productObj.unitPrice,
            quantity: this.productObj.quantity,
            category: this.productObj.category.catName,
          });
          this.formProductEdit.addAsyncValidators(
            Productasyncvalidators.createProductBrandValidator(
              this.productDataService,
              this.defalutProductName,
              this.defaultBrandName
            )
          );
        }
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/apperror']);
      }
    );
  }

  /*
  private forkProductAndCategory(): void {
    forkJoin([
      this.forkSubscribeCategory(),
      this.forkSubscribeProduct(),
    ]).subscribe(
      (res) => {
        if (res[0]) {
          let resultArr = _.uniqBy(res[0], (obj) => obj.catName);
          resultArr = _.sortBy(resultArr, 'catName');
          this.categories = resultArr;
        }
        if (res[1] && res[1][0]) {
          this.productObj = res[1][0];
          
          this.fileName =
            this.productObj.productImage.fileName || 'testfile.png';
          this.defalutProductName = this.productObj.name;
          this.defaultBrandName = this.productObj.brand;
          // this.buildForm();
          this.formProductEdit.patchValue({
            productname: this.productObj.name,
            brandname: this.productObj.brand,
            description: this.productObj.description,
            unitprice: this.productObj.unitPrice,
            quantity: this.productObj.quantity,
            category: this.productObj.category.catName,
          });
          this.formProductEdit.addAsyncValidators(
            Productasyncvalidators.createProductBrandValidator(
              this.productDataService,
              this.defalutProductName,
              this.defaultBrandName
            )
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }*/

  private forkSubscribeProductNew(
    productId: string
  ): Observable<ProductItemData> {
    return this.productDataService.getProductItemJson(productId).pipe(
      map((prod: ProductItemData) => {
        return prod;
      }),
      catchError((err) => {
        throw 'error in source. Details: ' + err;
      })
    );
  }

  private forkSubscribeCategoryNew(): Observable<CategoriesData> {
    return this.productDataService.getCategoriesJson().pipe(
      map((categoriesData: CategoriesData) => {
        return categoriesData;
      }),
      catchError((err) => {
        throw 'error in source. Details: ' + err;
      })
    );
  }

  /* private forkSubscribeProduct(): Observable<Array<Product>> {
    return this.productDataService.getProductsJson().pipe(
      map((prods: Array<Product>) => {
        return prods.filter(
          (prod) => prod.name === 'Paracetamol' && prod.brand === 'Cipla'
        );
      })
    );
  }

  private forkSubscribeCategory(): Observable<Array<Category>> {
    return this.productDataService.getProductsJson().pipe(
      map((products: Array<Product>) => {
        return products.map((product) => product.category);
      })
    );
  }*/

  get productname() {
    return this.formProductEdit.get('productname');
  }

  get brandname() {
    return this.formProductEdit.get('brandname');
  }

  get description() {
    return this.formProductEdit.get('description');
  }

  get unitprice() {
    return this.formProductEdit.get('unitprice');
  }

  get quantity() {
    return this.formProductEdit.get('quantity');
  }

  get category() {
    return this.formProductEdit.get('category');
  }

  get filesource() {
    return this.formProductEdit.get('filesource');
  }

  get fileupload() {
    return this.formProductEdit.get('fileupload');
  }

  async onProductEditFormSubmit() {
    this.formSubmitAttempt = true;

    // stop here if form is invalid
    if (this.formProductEdit.invalid) {
      return;
    }

    this.productObj.brand = this.brandname?.value;
    this.productObj.description = this.description?.value;
    this.productObj.name = this.productname?.value;
    this.productObj.isActive = true;
    this.productObj.quantity = this.quantity?.value;
    this.productObj.unitPrice = this.unitprice?.value;
    //this.productObj.category = this.category?.value;
    let catNew: Category = new Category();
    catNew.catName = this.category?.value;
    catNew.catDesc = this.categoryDesc || 'updateddescription';
    catNew.catImgUrl = this.productObj.category.catImgUrl;
    catNew.catActive = this.productObj.category.catActive;
    this.productObj.category = catNew;
    this.productObj.productImage.fileSource = this.filesource?.value;
    this.productObj.productImage.fileName = this.filesource?.value.name;
    this.productObj.productImage.fileSize = this.filesource?.value.size;
    this.productObj.productImage.fileType = this.filesource?.value.type;

    this.productDataService
      .updateProductJson(this.productObj)
      .pipe(
        map((data: ProductItemData) => {
          return data;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe(
        (data) => {
          if (data) {
            if (data.statusMsg === 'success') {
              this.addSnackBar.openFromComponent(ProductSnackComponent, {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                data: 'Product updated successfully.',
              });
              this.router.navigate(['/medicare/viewproducts']);
              //this.formProductAdd.reset();
            }
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );
    //this.router.navigate(['/medicare']);
    // await this.authService.login(username, password);

    //this.router.navigate(['/medicare']);

    // await this.authService.login(username, password);
  }
}
