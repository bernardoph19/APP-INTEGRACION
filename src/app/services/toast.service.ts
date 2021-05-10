import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController    : ToastController,
  ) { }

  async showToastShort(ms: string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 3000,
      cssClass:"toast-mess"
    });

    toast.present();
  }

  async showToastLongShort(ms: string) {
    let seg = 3000;

    if(ms !== 'No se encontraron datos') {  seg = 7000; }

    const toast = await this.toastController.create({
      message: ms,
      duration: seg,
      cssClass:"background"
    });

    toast.present();
  }  

}
