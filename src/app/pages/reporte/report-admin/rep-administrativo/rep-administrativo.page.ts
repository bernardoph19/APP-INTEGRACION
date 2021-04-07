import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListadoClientePage } from '../listado-cliente/listado-cliente.page';

@Component({
  selector: 'app-rep-administrativo',
  templateUrl: './rep-administrativo.page.html',
  styleUrls: ['./rep-administrativo.page.scss'],
})
export class RepAdministrativoPage implements OnInit {

  constructor(private modalListadoCliente: ModalController) { }

  async listadoClientes(){
    const modal = await this.modalListadoCliente.create({
      component:ListadoClientePage,
      componentProps: {
        nombre :  'Bernardo ',
        pais   :  'Peru'
         
      }
  });
   await modal.present();
   const {data} = await modal.onDidDismiss();
   console.log('retorno con daots',  data);
  }
 
  ngOnInit() {
  }

}
