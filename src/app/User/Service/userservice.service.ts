import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Address,
  EmailCountData,
  User,
  UserInfo,
  UserLoginInfo,
  UserLoginRes,
  UserSignup,
} from '../Model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userBaseUri: string = 'http://localhost:8626/api/v1/user';

  constructor(private http: HttpClient) {}

  public getUsersJson(): Observable<Array<User>> {
    return this.http.get<Array<User>>('assets/json/userdata.json');
  }

  public getUserJson(): Observable<Array<User>> {
    return this.http.get<Array<User>>('assets/json/userdata.json');
  }

  public getUserLoginJson(email: string): Observable<UserLoginRes> {
    return this.http.get<UserLoginRes>(`${this.userBaseUri}/${email}`);
  }

  public getUserEmailCountJson(email: string): Observable<EmailCountData> {
    return this.http.get<EmailCountData>(
      `${this.userBaseUri}/count?email=${email}`
    );
  }

  public postUserJson(userPostData: User): Observable<UserSignup> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(userPostData);
    return this.http.post<UserSignup>(`${this.userBaseUri}/register`, body, {
      headers: headers,
    });
  }

  public updateUserAddressJson(
    userUpdateData: Address,
    userId: string
  ): Observable<UserInfo> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(userUpdateData);
    return this.http.patch<UserInfo>(
      `${this.userBaseUri}/address/${userId}`,
      body,
      {
        headers: headers,
      }
    );
  }

  public postUserLoginJson(
    userLoginData: UserLoginInfo
  ): Observable<UserLoginRes> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(userLoginData);
    return this.http.post<UserLoginRes>(`${this.userBaseUri}/login`, body, {
      headers: headers,
    });
  }

  /*const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };*/
  /*httpOptions.headers =
  httpOptions.headers.set('Authorization', 'my-new-auth-token');*/
}
