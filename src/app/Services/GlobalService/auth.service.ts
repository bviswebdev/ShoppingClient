import { Injectable } from '@angular/core';
import { Auth } from 'src/app/Models/global.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = new Auth();
  constructor() {}
  set setIsAuthenticated(val: boolean) {
    this.auth.isAuthenticated = val;
  }
  set setRole(val: string) {
    this.auth.role = val;
  }

  set setIsUser(val: boolean) {
    this.auth.isUser = val;
  }

  set setIsAdmin(val: boolean) {
    this.auth.isAdmin = val;
  }

  set setAuthToken(val: string) {
    this.auth.authToken = val;
  }

  get IsAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }
  get Role(): string {
    return this.auth.role;
  }

  get IsUser() {
    return this.auth.isUser;
  }

  get IsAdmin() {
    return this.auth.isAdmin;
  }

  get AuthToken() {
    return this.auth.authToken;
  }
}
