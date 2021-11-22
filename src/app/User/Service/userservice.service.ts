import { Injectable } from '@angular/core';
import { Address, User } from '../Model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = new User();
  address: Array<Address> = new Array<Address>();

  constructor() {}

  set setId(val: string) {
    this.user.id = val;
  }

  get id(): string {
    return this.user.id;
  }

  set setFirstName(val: string) {
    this.user.firstName = val;
  }

  get firstName(): string {
    return this.user.firstName;
  }

  set setLastName(val: string) {
    this.user.lastName = val;
  }

  get lastName(): string {
    return this.user.lastName;
  }

  set setRole(val: string) {
    this.user.role = val;
  }

  get role(): string {
    return this.user.role;
  }

  set setEnabled(val: boolean) {
    this.user.enabled = val;
  }

  get enabled(): boolean {
    return this.user.enabled;
  }

  set setPassword(val: string) {
    this.user.password = val;
  }

  get password(): string {
    return this.user.password;
  }

  set setEmail(val: string) {
    this.user.email = val;
  }

  get email(): string {
    return this.user.email;
  }

  set setcontactNumber(val: string) {
    this.user.contactNumber = val;
  }

  get contactNumber(): string {
    return this.user.contactNumber;
  }

  set setAddresses(val: Address[]) {
    this.user.addresses = val;
  }

  get addresses(): Address[] {
    return this.user.addresses;
  }
}
