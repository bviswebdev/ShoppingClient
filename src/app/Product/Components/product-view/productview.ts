import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';

@Injectable()
export class ProductView {
  viewColumns: string[] = [];
  allColumns: string[] = [
    'productImageUrl',
    'productName',
    'productBrand',
    'productPrice',
    'productQtyAvailable',
    'view',
    'cart',
    'edit',
    'delete',
  ];

  publicRemoveColumns: string[] = ['edit', 'delete'];
  adminRemoveColumns: string[] = ['cart'];
  userRemoveColumns: string[] = ['edit', 'delete'];
  constructor(public authService: AuthService) {}

  public getDisplayColumnsRoleBased(): string[] {
    this.applyRoleDisplayedColumns();
    return this.viewColumns;
  }

  private applyRoleDisplayedColumns() {
    if (this.authService.IsAuthenticated && this.authService.IsUser) {
      this.viewColumns = this.filterDisplayedColumns(
        this.allColumns,
        this.userRemoveColumns
      );
    } else if (this.authService.IsAuthenticated && this.authService.IsAdmin) {
      this.viewColumns = this.filterDisplayedColumns(
        this.allColumns,
        this.adminRemoveColumns
      );
    } else {
      this.viewColumns = this.filterDisplayedColumns(
        this.allColumns,
        this.publicRemoveColumns
      );
    }
  }

  private filterDisplayedColumns(
    dpColumns: string[],
    rmCol: string[]
  ): string[] {
    rmCol.forEach((e, i, f) => {
      dpColumns.splice(dpColumns.indexOf(e), 1);
    });

    return dpColumns;
  }
}
