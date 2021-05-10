import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  Empty_data(forma: FormGroup) {

    return Object.values(forma.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(control => control.markAsTouched());
      }
      else {
        control.markAsTouched();
      }
    })
  }

  control_invalid( dato:string , forma:FormGroup ){
    return forma.get(dato).invalid && forma.get(dato).touched;
  }
  
  sinResultado ( res : any ){
    if (res== undefined) return false;
  }
  
}
