import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = "http://localhost:3000/auth"
  private _user !: User;

  get user() : User{
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  login(email:string, password:string):Observable<Boolean|String>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`,{email,password})
    .pipe(
      tap(resp => this._user = resp.user),
      map(resp => true),
      catchError(error => of(error.error.message))
    );
  }
}
