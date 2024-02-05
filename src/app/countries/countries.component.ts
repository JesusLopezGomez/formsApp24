import { JsonPipe, LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../shared/service/countries.service';
import { SmallContry } from '../shared/interfaces/countries';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,LowerCasePipe],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit{

  regions: string[] = [];
  countries: SmallContry[] = [];
  borders: string[] = [];

  constructor(private fb : FormBuilder, private countriesService : CountriesService){ }

  myForm: FormGroup = this.fb.group({
    region: ["",[Validators.required]],
    country: ["",[Validators.required]],
    border: ["",[Validators.required]]
  })

  save(){
    if(this.myForm.valid){
      alert("Formulario enviado");
    }else{
      this.myForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
    this.myForm.get('region')?.valueChanges
    .subscribe(
      (region) => {
      this.myForm.get("country")?.reset("");
      
      this.countriesService.getCountriesByRegion(region)
      .subscribe({
        next:(countries) => {
          this.countries = countries
          this.countries.sort((a,b) => a.name.common.localeCompare(b.name.common));
        }
      })
    }
    )
    
    this.myForm.get('country')?.valueChanges
    .subscribe(
      (country) => {
      this.countriesService.getBordersByRegion(country).subscribe({
        next: (borders) => {
          this.borders = borders;
        }
      })
    })
  }

}
