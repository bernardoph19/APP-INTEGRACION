import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.page.html',
  styleUrls: ['./listado-cliente.page.scss'],
})
export class ListadoClientePage implements OnInit {

  constructor(private modalListadoCliente:ModalController) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalListadoCliente.dismiss();
  }
  
  guardar() {
    this.modalListadoCliente.dismiss({  
    });
  }
}
