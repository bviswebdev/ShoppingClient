import { TestBed } from '@angular/core/testing';

import { AuthcustomerGuard } from './authcustomer.guard';

describe('AuthcustomerGuard', () => {
  let guard: AuthcustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthcustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
