import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { catchError, map } from 'rxjs/operators';
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
import { v4 as uuidv4 } from 'uuid';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  providers: [
    { provide: Productasyncvalidators, useClass: Productasyncvalidators },
  ],
})
export class ProductAddComponent implements OnInit {
  formProductAdd!: FormGroup;
  public formSubmitAttempt!: boolean;
  public fileUploadAttempt!: boolean;
  fileName = '';
  selectMatcher = new DtsErrorStateMatcher();
  categories: Array<string> = new Array<string>();
  categoryDesc: string = '';
  public productObj: Product = new Product();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private pdbrndValidator: PdbrandasyncValidator,
    private productDataService: ProductDataService,
    public dialog: MatDialog,
    private addSnackBar: MatSnackBar,
    public medAppService: MedicareappService
  ) {}

  ngOnInit(): void {
    this.pdbrndValidator.productService = this.productDataService;
    this.formProductAdd = this.fb.group(
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
          '0.00',
          [
            Validators.required,
            //Validators.pattern(/^[0-9]+\.[0-9]{2}$/),
            Validators.pattern('^([0-9]+|[0-9]+.[0-9]{1,2})$'),
          ],
        ],
        quantity: ['0', [Validators.required, Validators.pattern('^[0-9]+$')]],
        filesource: [
          '',
          [Validators.required, fileFormatValidator, fileSizeValidator],
        ],
        fileupload: [''],
        category: ['', [Validators.required]],
      },
      {
        validators: null,
        asyncValidators: Productasyncvalidators.createProductBrandValidator(
          this.productDataService
        ),

        updateOn: 'blur',
      }
    );

    this.categories = [];
    //this.subscribeCategory();
    this.subscribeCategoryNew();
  }

  openDialog() {
    let dialogRef = this.dialog.open(ProductAddcategoryComponent, {
      height: '350px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.categoryname) {
        this.categories.push(result.categoryname);
        this.categoryDesc = result.description;
        /* let categoryTemp: Category = new Category();
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
      this.formProductAdd.patchValue({
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

  private subscribeCategoryNew(): void {
    this.productDataService
      .getCategoriesJson()
      .pipe(
        map((categoriesData: CategoriesData) => {
          return categoriesData;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      )
      .subscribe(
        (data) => {
          if (data.statusMsg === 'success') {
            if (data.data) {
              this.categories = data.data;
            }
          }
        },
        (err) => {
          console.error('Oops:', err.message);
          this.router.navigate(['/apperror']);
        }
      );
  }

  /*
  private subscribeCategory(): void {
    this.productDataService
      .getProductsJson()
      .pipe(
        map((products: Array<Product>) =>
          products.map((product) => product.category)
        )
      )
      .subscribe((data) => {
        let resultArr = _.uniqBy(data, (obj) => obj.catName);
        resultArr = _.sortBy(resultArr, 'catName');
        this.categories = resultArr;
        //.log('categories');
        
      });
  }*/

  get productname() {
    return this.formProductAdd.get('productname');
  }

  get brandname() {
    return this.formProductAdd.get('brandname');
  }

  get description() {
    return this.formProductAdd.get('description');
  }

  get unitprice() {
    return this.formProductAdd.get('unitprice');
  }

  get quantity() {
    return this.formProductAdd.get('quantity');
  }

  get category() {
    return this.formProductAdd.get('category');
  }

  get filesource() {
    return this.formProductAdd.get('filesource');
  }

  get fileupload() {
    return this.formProductAdd.get('fileupload');
  }

  async onProductAddFormSubmit() {
    this.formSubmitAttempt = true;

    // stop here if form is invalid
    if (this.formProductAdd.invalid) {
      return;
    }

    this.productObj.code = uuidv4();
    this.productObj.brand = this.brandname?.value;
    this.productObj.description = this.description?.value;
    this.productObj.name = this.productname?.value;
    this.productObj.isActive = true;
    this.productObj.quantity = this.quantity?.value;
    this.productObj.unitPrice = this.unitprice?.value;
    let catNew: Category = new Category();
    catNew.catName = this.category?.value;
    catNew.catDesc = this.categoryDesc || 'test category';
    this.productObj.category = catNew;
    this.productObj.productImage.fileSource = this.filesource?.value;
    this.productObj.productImage.fileName = this.filesource?.value.name;
    this.productObj.productImage.fileSize = this.filesource?.value.size;
    this.productObj.productImage.fileType = this.filesource?.value.type;
    this.productObj.productImage.fileUrl = `assets/productimages/${this.productObj.code}`;
    this.productObj.supplierId = this.medAppService.appUser._id || '';

    this.productDataService
      .postProductJson(this.productObj)
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
                data: 'Product added successfully.',
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
  }
}
