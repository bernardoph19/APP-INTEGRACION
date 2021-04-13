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
}
