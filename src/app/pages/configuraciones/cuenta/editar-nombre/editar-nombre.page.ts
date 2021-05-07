import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editar-nombre',
  templateUrl: './editar-nombre.page.html',
  styleUrls: ['./editar-nombre.page.scss'],
})
export class EditarNombrePage implements OnInit {
  
  constructor(
    private modalEditNombre: ModalController
  ) {}

  ngOnInit() {}

  cancelar() {
    this.modalEditNombre.dismiss();
  }

  guardar() {
    this.modalEditNombre.dismiss({});
  }
}
