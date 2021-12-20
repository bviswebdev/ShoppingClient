import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-snack',
  templateUrl: './user-snack.component.html',
  styleUrls: ['./user-snack.component.scss'],
})
export class UserSnackComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}

  ngOnInit(): void {}
}
