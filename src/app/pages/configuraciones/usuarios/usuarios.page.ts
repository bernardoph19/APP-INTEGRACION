import { Component, OnInit } from '@angular/core';
import {  AlertController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  
  constructor(public alertController: AlertController) {}

  async descrip() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',      
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK, Cancelar']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  
  ngOnInit() {
  }

}
