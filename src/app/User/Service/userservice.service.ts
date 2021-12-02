import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, User } from '../Model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsersJson(): Observable<Array<User>> {
    return this.http.get<Array<User>>('assets/json/userdata.json');
  }
}
