import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FunctionsService } from './functions.service';

import { environment } from 'src/environments/environment';
import  { map } from 'rxjs/operators';

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


  async AdministrativeReport( body:any ){

    const headers = await this.sfunction._headersApi();
    const res = this.http.post(  `${environment.urlIntegracionApi}${this.url}listarventaadmin`, 
                            body, 
                            { headers }
                         )
                    .pipe( map( (result : any ) => result.result ) )
    
    return res;
  }
  
  AdministrativeReportDetalle( body:any ) {

    const headers = { 'content-type' : 'application/json'};

    const res = this.http.post(  `${environment.urlInteApiDetalle}`,  body,  { headers } )
                .pipe( map( (result : any ) => result ) )
    
    return res;
  }

  send_email( body:any ){
    return this.http.post(`${environment.urlApiFile}EnviarCorreo`, body);
  }

  pdf( body:any ){
    return this.http.post( `${environment.urlApiFile}pdf`, body)
  }

  xml( body:any ){
    return this.http.post(`${environment.urlApiFile}ListarXmlCdr?tipoArchivo=xml`, body)
  }

  cdr( body:any ){
    return this.http.post(`${environment.urlApiFile}ListarXmlCdr?tipoArchivo=cdr`, body);
  }

}
