import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {

  constructor(private modal:ModalController) { }
  
  cancelar() {
    this.modal.dismiss();
  }

  guardar() {
    this.modal.dismiss({});
  }
  

  ngOnInit() {
  }

}
