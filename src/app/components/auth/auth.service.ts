import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from 'src/app/model/User.model';
import { FieldsAction } from 'src/app/store/fields.action';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  public url = environment.apiRoute;

  constructor(private http: HttpClient, private store$: Store) {
    const token = localStorage.getItem('auth_key');
    this._isLoggedIn$.next(!!token);
  }


  public login(data: User): Observable<HttpClient>{
    return this.http.post<HttpClient>(`${this.url}/login`, data)
      .pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true);
          localStorage.setItem('auth_key', response.accessToken);
          this.store$.dispatch(FieldsAction.newUser({user:{...response.user, password:response.accessToken}}))
        })
      )        
  }

  public signup(data:object): Observable<HttpClient>{
    return this.http.post<HttpClient>(`${this.url}/register`, data)
  }
}