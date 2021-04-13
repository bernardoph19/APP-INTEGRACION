import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FunctionsService } from './functions.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteVentaService {
  
  private url : string ;
  private headers : any;

  constructor(
    private http      : HttpClient,
    private sfunction : FunctionsService    

  ) { 
    this.url = 'api/venta/';
    this.headers = { 'Authorization' : 'INNOVATED' }
  }


  AdministrativeReport( body:any ){

    const headers = this.sfunction._headersApi();
    return this.http.post(`${environment.urlIntegracionApi}${this.url}listarventaadmin`, body, { headers })
    
  }
}
