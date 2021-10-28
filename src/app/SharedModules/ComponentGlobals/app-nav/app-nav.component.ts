import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent implements OnInit {
  mobileMenu: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }
}
