import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CambiarContrasenaPage } from '../cambiar-contrasena/cambiar-contrasena.page';


@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {

  constructor(private modal: ModalController) {}

 

  editar: boolean;

 

   //Modal Cambiar Contraseña
   async cambiarContrasena() {
    const modal = await this.modal.create({
      component: CambiarContrasenaPage,
      componentProps: {
        // nombre: 'Bernardo ',
        // pais: 'Peru',
      },
    });
    
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('retorno con daots', data);
  }


  ngOnInit() {}
}
