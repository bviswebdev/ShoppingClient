import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Productasyncvalidators } from '../../Service/productasyncvalidators';
import { ProductDataService } from '../../Service/productservice.service';

@Component({
  selector: 'app-product-addcategory',
  templateUrl: './product-addcategory.component.html',
  styleUrls: ['./product-addcategory.component.scss'],
})
export class ProductAddcategoryComponent implements OnInit {
  formCategoryAdd!: FormGroup;
  public formSubmitAttempt!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProductAddcategoryComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productDataService: ProductDataService
  ) {}

  ngOnInit(): void {
    this.formCategoryAdd = this.fb.group({
      categoryname: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(30)],
          asyncValidators: Productasyncvalidators.createCategoryValidator(
            this.productDataService
          ),
          updateOn: 'blur',
        },
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  onCategoryAddFormSubmit() {
    this.formSubmitAttempt = true;

    if (this.formCategoryAdd.invalid) {
      return;
    }
    try {
      //this.router.navigate(['/medicare']);
      this.dialogRef.close(this.formCategoryAdd.value);

      // await this.authService.login(username, password);
    } catch (err) {
      console.log(err);
      this.router.navigate(['/apperror']);
    }
  }

  get categoryname() {
    return this.formCategoryAdd.get('categoryname');
  }

  get description() {
    return this.formCategoryAdd.get('description');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
