import { Injectable } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private dataStorage : DataStorageService,
  ) { }

  async _headersApi(): Promise<any> {
    
    const token = await this.dataStorage.getToken('login');
    console.log(token);
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIyMDM1NTE2NjU0NyIsImlhdCI6MTYxODUxODY0OSwiZXhwIjoxNjE4NTYxODQ5fQ.lJjW94usCw9XvsqlnrK8bynmjvuvWHlN23QCxqasdfare';
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
