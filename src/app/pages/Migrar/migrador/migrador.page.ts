import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-migrador',
  templateUrl: './migrador.page.html',
  styleUrls: ['./migrador.page.scss'],
})
export class MigradorPage implements OnInit {

  constructor(
    private navCtrl            : NavController,
    public  toastController    : ToastController,

  ) { }

  ngOnInit( ) {
  }


  Ver(){
    this.navCtrl.navigateRoot ('/menu-principal/proceso-migracion');
  }

  showNext() {

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
