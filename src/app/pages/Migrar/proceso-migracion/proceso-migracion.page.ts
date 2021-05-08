import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-proceso-migracion',
  templateUrl: './proceso-migracion.page.html',
  styleUrls: ['./proceso-migracion.page.scss'],
})
export class ProcesoMigracionPage implements OnInit {

  @Input() titulo: string;

  constructor(
    public  toastController    : ToastController,
  ) { }

  ngOnInit() {
  }

  migrarNext() {
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
