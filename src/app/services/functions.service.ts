import { Injectable } from '@angular/core';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private dataLocalService : DataLocalService
  ) { }

  _headersApi(): any {
    const token = this.dataLocalService.getTokenLogin();
    return { 'Authorization': `bearer ${token}` }
  }

  convertFecha(fecha: string) {

    const dat = new Date(fecha);
    const dia = dat.getDate();
    const mes = dat.getMonth() + 1;
    const año = dat.getFullYear();

    if (mes < 10) fecha = `${año}-0${mes}-${dia}`;
    else fecha = `${año}-${mes}-${dia};`
    return fecha;
  }
}
