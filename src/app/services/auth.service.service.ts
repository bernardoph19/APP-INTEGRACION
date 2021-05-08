import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { mdUseradd, mdUserLogin } from '../models/user-login';
import { DataStorageService } from './data-storage.service';
import { FunctionsService } from './functions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlPath    : string;
  
  constructor( 
    private http        : HttpClient, 
    private route       : Router,    
    public  dataStorage : DataStorageService,
    private sfunction   : FunctionsService,

  ) {
    this.urlPath = 'api/usuario/';
  }

  login( body : mdUserLogin ) {
    return this.http.post(`${environment.urlIntegracionApi}${this.urlPath}iniciosesion`, body );
  }

  logout() {
    this.dataStorage.clearAllStorage();    
  }

  async obtenerDatosStorage() {
    const storage =  await this.dataStorage.get('login');

    return storage.datos;
  }
  
  async getLoginStorage( key : string) {
    const storage =  await this.dataStorage.get( key );

    return storage;
  }

  setDatosStorage( key : string, body : any) {
    this.dataStorage.set( key,  body );    
  }
  
  async saveUser( body: mdUseradd ){

    const headers = await this.sfunction._headersApi();
    return this.http.post(`${environment.urlIntegracionApi}${this.urlPath}usuarioagregar`, body, { headers } );

  }

  async ValidarToken() {
    try 
    {
      const a = await this.ComprobantesServidor({fecha:'2021/04/01'});
    } 
    catch (e) 
    {
      if(e.error=='Unauthorized')
      {
        /* localStorage.removeItem('_token_login_m');
        this.route.navigateByUrl('/inicio') */

        this.logout();
        this.route.navigate(['/login'], { replaceUrl : true })
      }
    }
  }


  async ComprobantesServidor( body: any )
  {
    const headers = await this.sfunction._headersApi();
    return this.http.post(`${environment.urlIntegracionApi}venta/ventalistarporfecha`, body,{ headers })
  }
  
}
