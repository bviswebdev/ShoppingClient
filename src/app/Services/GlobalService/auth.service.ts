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

  get AuthObj() {
    return this.auth;
  }

  getAuthFromSessionStorage(): void {
    const sessionStore = JSON.parse(sessionStorage.getItem('medauth') || '{}');
    console.log('session storage = ' + sessionStore);
    console.log(sessionStorage.length);
    if (sessionStorage.length !== 0) {
      this.setIsAuthenticated = sessionStore.isAuthenticated;
      this.setIsAdmin = sessionStore.isAdmin;
      this.setIsUser = sessionStore.isUser;
      this.setRole = sessionStore.role;
      this.setAuthToken = sessionStore.authToken;
    }
  }

  setAuthToSessionStorage(loggedAuth: Auth): void {
    this.setIsAuthenticated = loggedAuth.isAuthenticated;
    this.setIsAdmin = loggedAuth.isAdmin;
    this.setIsUser = loggedAuth.isUser;
    this.setRole = loggedAuth.role;
    this.setAuthToken = loggedAuth.authToken;
    sessionStorage.setItem('medauth', JSON.stringify(this.auth));
  }

  setAdminToSessionStorage(role: string, token: string): void {
    this.setIsAuthenticated = true;
    this.setIsAdmin = true;
    this.setIsUser = false;
    this.setRole = role;
    this.setAuthToken = token;
    sessionStorage.setItem('medauth', JSON.stringify(this.auth));
  }

  setUserToSessionStorage(role: string, token: string): void {
    this.setIsAuthenticated = true;
    this.setIsAdmin = false;
    this.setIsUser = true;
    this.setRole = role;
    this.setAuthToken = token;
    sessionStorage.setItem('medauth', JSON.stringify(this.auth));
  }

  resetAuthSessionStorage(): void {
    this.setIsAuthenticated = false;
    this.setIsAdmin = false;
    this.setIsUser = false;
    this.setRole = '';
    this.setAuthToken = '';
    sessionStorage.clear();
  }
}
