import { Injectable } from '@angular/core';
import { CanLoad,  Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanLoad {
  constructor(
    private router              : Router,
    private dataStorageService  : DataStorageService,
  ) {

  }

  async canLoad(): Promise<boolean> {

      const res = await this.dataStorageService.getToken('login');
      console.log(res);
      
      if (res !== null ) {
        this.router.navigate(['/menu-principal/migrador'], { replaceUrl : true});
          return true;
      } else {        
        return true;
        
      }
  }
}
