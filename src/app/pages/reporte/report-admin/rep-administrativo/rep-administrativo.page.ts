import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListadoClientePage } from '../listado-cliente/listado-cliente.page';
import { DataLocalService } from 'src/app/services/data-local.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-rep-administrativo',
  templateUrl: './rep-administrativo.page.html',
  styleUrls: ['./rep-administrativo.page.scss'],
})
export class RepAdministrativoPage implements OnInit {

  formAdministrative : FormGroup;
  error              : boolean;

  message            : string;
  

  constructor(
    private modalListadoCliente : ModalController,
    private dataLocalService    : DataLocalService,
    private sformValidator      : FormValidatorService,
    
  ) {

    this.dataLocalService.getUserLogin().then((x : any) => {
      console.log(JSON.stringify(x));

    });
   }

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

  initialize() {
    
    this.error = false;
    this.message = null;

  }

  listarVentasAll() {
    
    if (this.formAdministrative.invalid) {
      return this.sformValidator.Empty_data(this.formAdministrative);
    }

  }

}
