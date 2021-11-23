import { Injectable } from '@angular/core';
import { MedicareApp } from 'src/app/Models/global.model';
import { User } from 'src/app/User/Model/user.model';

@Injectable({
  providedIn: 'root',
})
export class MedicareappService {
  medApp: MedicareApp = new MedicareApp();

  constructor() {}

  set setAppUser(val: User) {
    this.medApp.user = val;
  }

  get appUser(): User {
    return this.medApp.user;
  }
}
