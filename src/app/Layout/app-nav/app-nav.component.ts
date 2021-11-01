import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/Models/global.model';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent implements OnInit {
  mobileMenu: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  showMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }

  appSignIn(): void {
    this.authService.setAdminToSessionStorage('admin', 'test');
  }

  appSignOut(): void {
    this.authService.resetAuthSessionStorage();
    this.router.navigate(['/signin']);
  }
}
