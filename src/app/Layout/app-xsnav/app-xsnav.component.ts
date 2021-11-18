import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/GlobalService/auth.service';

@Component({
  selector: 'app-xsnav',
  templateUrl: './app-xsnav.component.html',
  styleUrls: ['./app-xsnav.component.scss'],
})
export class AppXsnavComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  appSignIn(): void {
    //this.authService.setAdminToSessionStorage('admin', 'test');
  }

  appSignOut(): void {
    this.authService.resetAuthSessionStorage();
    this.router.navigate(['/medicare/signin']);
  }
}
