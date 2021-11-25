import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formCategoryAdd = this.fb.group({
      categoryname: ['', [Validators.required, Validators.maxLength(30)]],
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
      console.log(this.formCategoryAdd);

      //this.router.navigate(['/medicare']);

      // await this.authService.login(username, password);
    } catch (err) {
      console.log(err);
    }
  }

  get categoryname() {
    return this.formCategoryAdd.get('categoryname');
  }

  get description() {
    return this.formCategoryAdd.get('description');
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
