import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth_key');
    this._isLoggedIn$.next(!!token);
  }


    login(data:object){
        console.log(this.http.post<object>("http://localhost:3000/login", data).subscribe(res => console.log(res)))
        
        
        return this.http.post<object>("http://localhost:3000/login", data)
            .pipe(
                tap((response: any) => {
                this._isLoggedIn$.next(true);
                localStorage.setItem('auth_key', response.accessToken);
                })
            )        
    }
}