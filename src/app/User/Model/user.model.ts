export interface UserSignup {
  statusMsg?: string;
  data?: User;
}

export interface UserInfo {
  statusMsg?: string;
  data?: User;
}

export interface UserLoginInfo {
  email: string;
  password: string;
}

export interface UserLoginRes {
  statusMsg?: string;
  data?: any;
}

export interface EmailCountData {
  statusMsg?: string;
  data?: number;
}

export class User {
  constructor(
    public _id?: string,
    public firstName: string = '',
    public lastName: string = '',
    public role: string = '',
    public enabled: boolean = false,
    public password: string = '',
    public email: string = '',
    public contactNumber: string = '',
    public addresses: Array<Address> = new Array<Address>()
  ) {}
}

export class Address {
  constructor(
    public _id?: string,
    public addressLineOne: string = '',
    public addressLineTwo: string = '',
    public city: string = '',
    public state: string = '',
    public country: string = '',
    public postalCode: string = '',
    public isBilling: boolean = false,
    public isShipping: boolean = false
  ) {}
}
