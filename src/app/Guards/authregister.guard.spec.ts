import { TestBed } from '@angular/core/testing';

import { AuthregisterGuard } from './authregister.guard';

describe('AuthregisterGuard', () => {
  let guard: AuthregisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthregisterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
