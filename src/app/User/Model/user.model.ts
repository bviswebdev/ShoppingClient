export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public enabled: boolean,
    public password: string,
    public email: string,
    public contactNumber: string,
    public addresses: Array<Address>
  ) {}
}

export class Address {
  constructor(
    public id: string,
    public addressLineOne: string,
    public addressLineTwo: string,
    public city: string,
    public state: string,
    public country: boolean,
    public postalCode: string,
    public isBilling: boolean,
    public isShipping: boolean
  ) {}
}
