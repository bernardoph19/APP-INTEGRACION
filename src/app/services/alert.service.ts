import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private alert: AlertController, ) { }

  async Alert( title : string, message : string, redi : void ){

     const alert = await this.alert.create({
      cssClass : 'alert',
      header   : title,
      message  : message,
      buttons  : [
        {
          text    : 'OK',
          handler :  () => redi
        }
      ] 
    });

    alert.present();    

  }
}
