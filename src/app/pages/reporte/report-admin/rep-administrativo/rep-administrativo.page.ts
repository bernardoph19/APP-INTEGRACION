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
import { NgZone } from '@angular/core';


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
  expiredS           : boolean;
  s = this;

  constructor(
    private modalListadoCliente : ModalController,
    private sformValidator      : FormValidatorService,
    private router              : Router,
    private sfunction           : FunctionsService,
    private fb                  : FormBuilder,
    private sreportVenta        : ReporteVentaService,
    private spinner             : NgxSpinnerService,
    private modalEditNombRe     : ModalController,
    private salert              : AlertService,
    private zone                : NgZone
  ) {
   
    this.createFormReport(); 
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
          this.salert.Alert( title, message, );

        }

        else{ this.Mostrar_cpe( response ); }

        this.spinner.hide();

      }, (err) => {

        this.error     = true;
        this.expiredS  = err.error === 'Unauthorized';
        this.message   = (this.expiredS) ? 'Su sesion Expiró, Inicie sesion nuevamente.' : (err.error.menssage)  ?? 'Sin conexion al servidor';
        
        this.spinner.hide();
        const title = 'Oops!!!';
        this.salert.Alert( title, this.message, this.sExpiredNav(this) );
        
        setTimeout(() => {
          //this.navToLogin();
        }, 1500);
      });

  }

  async Mostrar_cpe( list : any [] ){

    const listcpeFilter  = list.slice(0, 20);
    list.forEach( el=>{ el.isChecked = false; })
    const modal = await this.modalEditNombRe.create({
      component:MostrarComprobantesPage,
      componentProps: {
        listcpe        : listcpeFilter,
        listcpeGeneral : list

      }
  });
   await modal.present();
   const {data} = await modal.onDidDismiss();
   console.log('retorno con daots',  data);
  }


  sExpiredNav(self) {
    
    localStorage.removeItem('key');    
    self.router.navigate(['/login'],  { replaceUrl: true });
    
  }

}