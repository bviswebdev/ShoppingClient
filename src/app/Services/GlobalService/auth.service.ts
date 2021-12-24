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

  set setEmail(val: string) {
    this.auth.email = val;
  }

  set setUserName(val: string) {
    this.auth.userName = val;
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

  get Email() {
    return this.auth.email;
  }

  get UserName() {
    return this.auth.userName;
  }

  get AuthToken() {
    return this.auth.authToken;
  }

  get AuthObj() {
    return this.auth;
  }

  getAuthFromSessionStorage(): void {
    const sessionAuth = sessionStorage.getItem('medauth');
    if (sessionAuth) {
      const sessionStore = JSON.parse(sessionAuth);
      //const sessionStore = JSON.parse(sessionStorage.getItem('medauth') || '{}');

      this.setIsAuthenticated = sessionStore.isAuthenticated;
      this.setIsAdmin = sessionStore.isAdmin;
      this.setIsUser = sessionStore.isUser;
      this.setRole = sessionStore.role;
      this.setAuthToken = sessionStore.authToken;
      this.setEmail = sessionStore.email;
      this.setUserName = sessionStore.userName;
    }
  }

  setAuthToSessionStorage(loggedAuth: Auth): void {
    this.setIsAuthenticated = loggedAuth.isAuthenticated;
    this.setIsAdmin = loggedAuth.isAdmin;
    this.setIsUser = loggedAuth.isUser;
    this.setRole = loggedAuth.role;
    this.setAuthToken = loggedAuth.authToken;
    this.setEmail = loggedAuth.email;
    this.setUserName = loggedAuth.userName;
    sessionStorage.setItem('medauth', JSON.stringify(this.auth));
  }

  setAdminToSessionStorage(
    role: string,
    token: string,
    email: string,
    userName: string
  ): void {
    this.setIsAuthenticated = true;
    this.setIsAdmin = true;
    this.setIsUser = false;
    this.setRole = role;
    this.setAuthToken = token;
    this.setEmail = email;
    this.setUserName = userName;
    sessionStorage.setItem('medauth', JSON.stringify(this.auth));
  }

  setUserToSessionStorage(
    role: string,
    token: string,
    email: string,
    userName: string
  ): void {
    this.setIsAuthenticated = true;
    this.setIsAdmin = false;
    this.setIsUser = true;
    this.setRole = role;
    this.setAuthToken = token;
    this.setEmail = email;
    this.setUserName = userName;
    sessionStorage.setItem('medauth', JSON.stringify(this.auth));
  }

  resetAuthSessionStorage(): void {
    this.setIsAuthenticated = false;
    this.setIsAdmin = false;
    this.setIsUser = false;
    this.setRole = '';
    this.setAuthToken = '';
    this.setEmail = '';
    this.setUserName = '';
    sessionStorage.clear();
  }
}
