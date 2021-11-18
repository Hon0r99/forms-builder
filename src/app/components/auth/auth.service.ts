import { environment } from 'src/environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/model/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  private url = environment.apiRoute;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth_key');
    this._isLoggedIn$.next(!!token);
  }


  public login(data: User): Observable<HttpClient>{
    return this.http.post<object>(`${this.url}/login`, data)
      .pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true);
          localStorage.setItem('auth_key', response.accessToken);
         })
      )        
  }

  public signup(data:object) :Observable<HttpClient>{
    return this.http.post<any>(`${this.url}/register`, data)
  }
}