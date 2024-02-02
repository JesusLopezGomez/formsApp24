import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  nameSurnamePatter : string = "([A-Za-z]+) ([a-zA-z]+)"
  emailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 


  forbiddenNameValidator(check:string) : ValidatorFn{
   
    return (control : AbstractControl) : ValidationErrors | null=> {
      const username: string = control.value.trim().toLowerCase();
      if(username === check){
        return {usernameForbidden: true}
      }
  
      return null;
    }

  } 

  equalsFields(field1:string,field2:string) : ValidatorFn{

    return (formCotrol: AbstractControl) : ValidationErrors | null => {
      const field1Input : string = formCotrol.get(field1)?.value;
      const field2Input : string = formCotrol.get(field2)?.value;
      if(field1Input !== field2Input){
        formCotrol.get(field2)?.setErrors({nonEquals:true})
        return {notEqualsFields:true}
      }
      formCotrol.get(field2)?.setErrors(null)
      return null;
    }
  }
}
