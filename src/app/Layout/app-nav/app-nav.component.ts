import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Cart/Model/cart.model';
import { Auth } from 'src/app/Models/global.model';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';
import { MedicareappService } from 'src/app/Services/GlobalService/medicareapp.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent implements OnInit {
  mobileMenu: boolean = false;
  userCart: Cart = new Cart();

  constructor(
    public authService: AuthService,
    private router: Router,
    public medAppService: MedicareappService
  ) {}

  ngOnInit(): void {
    this.userCart = this.medAppService.appUserCart;
  }

  showMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }

  appSignIn(): void {
    //this.authService.setAdminToSessionStorage('admin', 'test');
  }

  appSignOut(): void {
    this.authService.resetAuthSessionStorage();
    this.router.navigate(['/medicare/signin']);
  }
}
