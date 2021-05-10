import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';

import { AlertService } from 'src/app/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
//import { Share } from '@capacitor/core';

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { ToastService } from 'src/app/services/toast.service';
const  { Share } = Plugins;

@Component({
  selector: 'app-rep-contable',
  templateUrl: './rep-contable.page.html',
  styleUrls: ['./rep-contable.page.scss'],
})
export class RepContablePage implements OnInit {
  
  buscar   : boolean = false;
  form     : FormGroup;
  message  : string;
  cnn_expi : boolean;
  expiredS : boolean;
  sinDatos : boolean = false;

  data                   : any; 
  rutaArchivo            : string;
  
  anio     : number;  
  mes      : string;
  noShare  : boolean = true;

  constructor(
    private sformValidator      : FormValidatorService,
    private fb                  : FormBuilder,
    private spinner             : NgxSpinnerService,
    private sreportVenta        : ReporteVentaService,
    private sfunction           : FunctionsService,
    private dataStorageService  : DataStorageService,
    private router              : Router,
    private salert              : AlertService,
    private stoast              : ToastService,


  ) {
    this.createForm();
    this.anio = this.form.value.anio

   }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      'anio': [new Date().getFullYear(), [Validators.required]],
      'mes': ['',                        [Validators.required]]   
    });
  }

  initialize() {
    this.spinner.show();        
    this.message = null;    
    this.cnn_expi = false;
    this.data = null;
    /* this.columns = [];
    this.displayedColumns = [];   */  
  }

  get yearInvalid() {
    return this.sformValidator.control_invalid('anio', this.form);
  }

  get monthInvalid() {
    return this.sformValidator.control_invalid('mes', this.form);
  }

  async listReporteContable() {

    if (this.form.invalid) {
      return this.sformValidator.Empty_data(this.form);
    }

    this.initialize();
    const body = {
      //... this.form.value
      anio : this.anio,
      mes  : this.form.value.mes
    };

    (await this.sreportVenta.ContableReport(body)).subscribe((response: any) => {
      
      if(response.message == 'exito') {
        
        const result = response.result;
        
        if (result.length > 0) {

          this.anio     = this.form.value.anio;
          this.mes      = this.form.value.mes;  
          this.data = result;
          this.buscar = true;
          this.noShare  = false;
  
        } else {
          
          this.message = 'No se encontraron datos';
          this.stoast.showToastLongShort(this.message);          
        }
      }
      this.spinner.hide();

    }, (error : any) => {
            
      this.expiredS  = error.error === 'Unauthorized';
      this.message   = (this.expiredS) ? 'Su sesion Expiró, Inicie sesion nuevamente.' : (error.error.message)  ?? 'Sin conexion al servidor';
       
      this.spinner.hide();
      const title = 'Oops!!!';
      (this.expiredS) ? this.salert.Alert( title, this.message, this.sExpiredNav(this) )
                      : this.salert.Alert( title, this.message, '' );

    });

  }

  
  async descargarExcel() {
    
    try 
    {
      if(this.data.length < 1) {     

        this.message = 'No se encontraron datos';
        this.stoast.showToastLongShort(this.message);
        return;

      }
      
      this.anio        = this.form.value.anio;
      this.mes         = this.form.value.mes;
      const ruc        = await this.dataStorageService.get('credenciales');
      const name_file  = `${ruc.ruc}-${this.anio}-${this.mes}`;

      const Noenviados = this.data.filter( ( cpe : any ) => { 

        if( cpe['RAZÓN SOCIAL & NOMBRE'] == 'ANULADO' ) { 
          if(cpe.IDAnuladoEnviado == false ) return cpe; 
        } else if(cpe.IDEnviado == false ) return cpe;
        
      });

      if( Noenviados.length == 0 ){

        this.sfunction.crearArchivoExcel(this.data, name_file);
        //this.sfunction.convertJSONtoText(this.data, name_file);   for CSV
         
      } else {        
        this.message = 'Algunos comprobantes aun no han sido enviados, envie todos los comprobantes de el mes seleccinado para poder exportar a excel'
        this.stoast.showToastLongShort(this.message);
      }
    } 
    catch (error) 
    {      
      this.message = 'No se encontraron datos'
      this.stoast.showToastLongShort(this.message);
    }

  }
  

  nombreMes($event) {
    this.buscar = false;
    this.noShare  = true;
    
    
  }
  
  changeAnio($event) {
    const anio = parseInt($event.detail.value.substr(0 , [4]));
    this.anio = anio;
    this.buscar = false;
    this.noShare  = true;
    
  }

  sExpiredNav(self : any) {    
    this.dataStorageService.clearAllStorage();
    this.router.navigate(['/login'],  { replaceUrl: true });    
  }

  // Compartir comprobante
  async shared() {

    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });

  }


  
}
