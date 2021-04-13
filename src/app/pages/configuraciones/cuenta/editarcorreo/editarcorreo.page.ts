import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editarcorreo',
  templateUrl: './editarcorreo.page.html',
  styleUrls: ['./editarcorreo.page.scss'],
})
export class EditarcorreoPage implements OnInit {

  constructor(private modal:ModalController) { }


  cancelar() {

    this.modal.dismiss();

  }
  
  guardar() {
    
    this.modal.dismiss({  
      
    });
}
  ngOnInit() {
  }

}
