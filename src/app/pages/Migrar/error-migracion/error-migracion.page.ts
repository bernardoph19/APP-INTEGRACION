import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-error-migracion',
  templateUrl: './error-migracion.page.html',
  styleUrls: ['./error-migracion.page.scss'],
})
export class ErrorMigracionPage implements OnInit {

  constructor(
    public loading: LoadingController,
    public  toastController    : ToastController,
  ) { }

  ngOnInit() {}

  async presentLoading() {

    /* const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Procesando Errores',
      duration: 2000

    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!'); */

    this.presentToast('Próximamente ...')

  }

  async presentToast(ms: string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 3000,
      cssClass:"toast-mess"
    });

    toast.present();
  }


}
