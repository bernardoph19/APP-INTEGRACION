import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListadoClientePage } from '../listado-cliente/listado-cliente.page';
import { DataLocalService } from 'src/app/services/data-local.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { FunctionsService } from 'src/app/services/functions.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';


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
    private router              : Router,
    private spinner:       NgxSpinnerService,    
    private sfunction           : FunctionsService,
    private fb                  : FormBuilder,
    private sreportVenta        : ReporteVentaService,
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

    const body = {
      ... this.formAdministrative.value
    };

    body.fechainicio = this.sfunction.convertFecha(body.fechainicio);
    body.fechafin    = this.sfunction.convertFecha(body.fechafin);
    body.numero      = (String(body.numero) === 'null') ? '0' : String(body.numero);

    this.sreportVenta.AdministrativeReport(body)
      .subscribe( (res) => {
        const r = JSON.stringify(res);
        console.log(r);
      });

  }

  buscar(){     
    this.router.navigate(['/menu-principal/mostrar-comprobantes']);
    // this.spinner.hide(); 
   }

}
