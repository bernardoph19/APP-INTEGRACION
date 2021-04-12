import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
//import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor( private nativeStorage: NativeStorage ) { }

  async setUserLogin (user ) {
    await this.nativeStorage.setItem('userLogueado', user)
      .then(
        () => {          
         console.log('exito');
        },
        error => console.error('Error storing item', error)
      )
      .catch(() => {
        alert('no compatible con CORDOVA')
      });

  }

  getUserLogin () {
    return this.nativeStorage.getItem('userLogueado')
      .then(
        data => {          
          return data;
          //return true;
        },
        error => {          
          return error;
          //return false;
        }
      );

  }

  async clearUsuerLogin () {
    return this.nativeStorage.clear().then(() => {
      return true;
    })

  }

}
