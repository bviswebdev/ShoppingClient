import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EmailCountData } from '../Model/user.model';
import { UserService } from './userservice.service';

@Injectable()
export class Userasyncvalidators {
  static createEmailExistsValidator(
    userDataService: UserService
  ): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return userDataService.getUserEmailCountJson(control.value).pipe(
        map((pd: EmailCountData) => {
          return pd.statusMsg === 'success' && pd.data && pd.data > 0
            ? { emailExists: true }
            : null;
        }),
        catchError(() => of(null))
      );
    };
  }
}
