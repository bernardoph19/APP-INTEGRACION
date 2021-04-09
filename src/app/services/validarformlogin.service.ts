import { Injectable } from '@angular/core';
import {  FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarformloginService {

  emptyData(forma: FormGroup) {

    return Object.values(forma.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(control => control.markAsTouched());
      }
      else {
        control.markAsTouched();
      }
    })
  }

  controlInvalid( dato:string , forma:FormGroup ){
    return forma.get(dato).invalid && forma.get(dato).touched;
  }

  sinResultado ( res : any ){
    if (res== undefined) return false;
  }



}
