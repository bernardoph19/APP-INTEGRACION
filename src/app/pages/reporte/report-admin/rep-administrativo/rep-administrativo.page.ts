import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ListadoClientePage } from '../listado-cliente/listado-cliente.page';
import { DataLocalService } from 'src/app/services/data-local.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { FunctionsService } from 'src/app/services/functions.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';
import { MostrarComprobantesPage } from '../mostrar-comprobantes/mostrar-comprobantes.page';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-rep-administrativo',
  templateUrl: './rep-administrativo.page.html',
  styleUrls: ['./rep-administrativo.page.scss'],
})
export class RepAdministrativoPage implements OnInit {

  listcpe : any[] = []
  formAdministrative : FormGroup;
  error              : boolean;
  message            : string;  

  constructor(
    private modalListadoCliente : ModalController,
    private sformValidator      : FormValidatorService,
    private router              : Router,
    private sfunction           : FunctionsService,
    private fb                  : FormBuilder,
    private sreportVenta        : ReporteVentaService,
    private spinner             : NgxSpinnerService,
    private modalEditNombRe     : ModalController,
    private salert              : AlertService
  ) {

    this.createFormReport();
    
    /* this.dataLocalService.getUserLogin().then((x : any) => {
      console.log(JSON.stringify(x));
    }); */

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

  createFormReport() {
    this.formAdministrative = this.fb.group({
      fechainicio : [ new Date(), Validators.required ],
      fechafin    : [ new Date(), Validators.required ],
      serie       : [ '' ],
      numero      : [ '' ],
      cliente     : [ '' ]
    });
  }

  initialize() {    
    this.error = false;
    this.message = null;

  }

  listarVentasAll() {
    
    if (this.formAdministrative.invalid) {
      return this.sformValidator.Empty_data(this.formAdministrative);
    }

    this.initialize();
    this.spinner.show();

    const body = {
      ... this.formAdministrative.value
    };

    body.fechainicio = this.sfunction.convertFecha(body.fechainicio);
    body.fechafin    = this.sfunction.convertFecha(body.fechafin);
    body.numero      = (String(body.numero) === 'null') ? '0' : String(body.numero);

    this.sreportVenta.AdministrativeReport(body)
      .subscribe( (response : any []) => {

        if( response.length === 0 ){

          const title = 'Oops!!!';
          const message = 'No se encontro ningún comprobante';
          this.salert.Alert( title, message );
        }
        else{
          this.Mostrar_cpe( response );
        }
        this.spinner.hide();
      });

  }


  async Mostrar_cpe( list : any [] ){
    list.forEach( el=>{ el.isChecked = false; })
    const modal = await this.modalEditNombRe.create({
      component:MostrarComprobantesPage,
      componentProps: {
        listcpe : list
      }
  });
   await modal.present();
   const {data} = await modal.onDidDismiss();
   console.log('retorno con daots',  data);
  }

}
