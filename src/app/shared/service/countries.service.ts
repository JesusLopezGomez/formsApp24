import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Border, SmallContry } from '../interfaces/countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions : string[] = ['Africa','Americas','Antarctic','Asia','Europe','Oceania'];
  private baseUrl : string = "https://restcountries.com/v3.1"
  get regions () : string[]{
    return [...this._regions];
  }

  constructor(private http : HttpClient) { }

  getCountriesByRegion(region:string) : Observable<SmallContry[]>{
    return this.http.get<SmallContry[]>(`${this.baseUrl}/region/${region}?fields=name,ccn3`);
  }

  getBordersByCountry(cod:string) : Observable<Border>{
    if(cod){
      return this.http.get<Border>(`${this.baseUrl}/alpha/${cod}?fields=borders`);
    }else{
      return of();
    }
  }
}
