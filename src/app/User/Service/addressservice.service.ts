import { Injectable } from '@angular/core';
import { Address } from '../Model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  addr: Address = new Address();
  constructor() {}

  set setId(val: string) {
    this.addr._id = val;
  }

  get id(): string {
    return this.addr._id || '';
  }

  set setAddressLineOne(val: string) {
    this.addr.addressLineOne = val;
  }

  get addressLineOne(): string {
    return this.addr.addressLineOne;
  }

  set setAddressLineTwo(val: string) {
    this.addr.addressLineTwo = val;
  }

  get addressLineTwo(): string {
    return this.addr.addressLineTwo;
  }

  set setCity(val: string) {
    this.addr.city = val;
  }

  get city(): string {
    return this.addr.city;
  }

  set setState(val: string) {
    this.addr.state = val;
  }

  get state(): string {
    return this.addr.state;
  }

  set setCountry(val: string) {
    this.addr.country = val;
  }

  get country(): string {
    return this.addr.country;
  }

  set setPostalCode(val: string) {
    this.addr.postalCode = val;
  }

  get postalCode(): string {
    return this.addr.postalCode;
  }

  set setIsBilling(val: boolean) {
    this.addr.isBilling = val;
  }

  get isBilling(): boolean {
    return this.addr.isBilling;
  }

  set setIsShipping(val: boolean) {
    this.addr.isShipping = val;
  }

  get isShipping(): boolean {
    return this.addr.isShipping;
  }
}
