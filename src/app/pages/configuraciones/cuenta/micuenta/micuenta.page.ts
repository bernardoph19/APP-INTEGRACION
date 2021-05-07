import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service.service';
import { CambiarContrasenaPage } from '../cambiar-contrasena/cambiar-contrasena.page';


@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {
  d           : any = {};

  constructor( 
    private modal  : ModalController,
    private auth   : AuthService,
  ) {}

 

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


  async ngOnInit() {
    this.d = await this.auth.obtenerDatosStorage();
    console.log(this.d);
  }

  onSubmit() {

  }
  
}
