import { HttpHandler } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ],
      providers: [HttpClient, HttpClientModule, HttpHandler]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
