import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditarNombrePage } from '../editar-nombre/editar-nombre.page';
import { EditarcorreoPage } from '../editarcorreo/editarcorreo.page';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {
  constructor(private modal: ModalController) {}

  // Modal editar Nombre
  async editarNombre() {
    const modal = await this.modal.create({
      component: EditarNombrePage,
      componentProps: {
        nombre: 'Bernardo ',
        pais: 'Peru',
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('retorno con daots', data);
  }

  // modal editar correo
  async editarcorreo() {
    const modal = await this.modal.create({
      component: EditarcorreoPage,
      componentProps: {
        nombre: 'Bernardo ',
        pais: 'Peru',
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('retorno con daots', data);
  }

  ngOnInit() {}
}
