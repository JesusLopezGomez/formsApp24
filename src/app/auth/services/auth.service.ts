import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = "http://localhost:3000/auth"

  constructor(private http: HttpClient) { }

  login(email:string, password:string){
    return this.http.post(`${this.baseUrl}/login`,{email,password});
  }
}
