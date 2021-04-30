import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { mdUserLogin } from '../models/user-login';
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
    private sfunction   : FunctionsService,
    public  dataStorage : DataStorageService,
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
  
  
}
