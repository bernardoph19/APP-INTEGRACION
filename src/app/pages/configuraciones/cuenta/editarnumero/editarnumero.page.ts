import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editarnumero',
  templateUrl: './editarnumero.page.html',
  styleUrls: ['./editarnumero.page.scss'],
})
export class EditarnumeroPage implements OnInit {
  constructor(private modal: ModalController) {}

  cancelar() {
    this.modal.dismiss();
  }

  guardar() {
    this.modal.dismiss({});
  }
  ngOnInit() {}
}
