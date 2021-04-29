import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';

import { AlertService } from 'src/app/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';
import { Share } from '@capacitor/core';

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

  columns                           = [];
  displayedColumns       : string[] = [];
  data                   : any; 
  
  anio     : number;  
  mes      : string;

  constructor(
    private sformValidator      : FormValidatorService,
    private fb                  : FormBuilder,
    private spinner             : NgxSpinnerService,
    private sreportVenta        : ReporteVentaService,
    private sfunction           : FunctionsService,
    private dataStorageService  : DataStorageService,
    private router              : Router,
    private salert              : AlertService,
    public  toastController     : ToastController,


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
    this.columns = [];
    this.displayedColumns = [];    
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
          this.anio = this.form.value.anio;
          this.mes = this.form.value.mes;       
  
          const columns = result[0];                                            
          const keys = Object.keys(columns);

          console.log(columns)

          for (let i of keys) {
            this.columns.push({ titulo: i });
            this.displayedColumns.push(i);
          }
  
          this.data = result;
          this.buscar = true;
  
        } else {
          
          this.message = 'No se encontraron datos';
          this.presentToast(this.message);
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
        this.presentToast(this.message);
        return;

      }
      
      this.anio       = this.form.value.anio;
      this.mes        = this.form.value.mes;
      const ruc       = await this.dataStorageService.get('credenciales');
      const name_file = `${ruc.ruc}-${this.anio}-${this.mes}`;

      const Noenviados = this.data.filter( ( cpe : any ) => { 

        if( cpe['RAZÓN SOCIAL & NOMBRE'] == 'ANULADO' ) { 
          if(cpe.IDAnuladoEnviado == false ) return cpe; 
        } else if(cpe.IDEnviado == false ) return cpe;
      });

      if( Noenviados.length == 0 ) this.sfunction.exportToExcel(this.data, name_file)
      else {        
        this.message = 'Algunos comprobantes aun no han sido enviados, envie todos los comprobantes de el mes seleccinado para poder exportar a excel'
        this.presentToast(this.message);
      }
    } 
    catch (error) 
    {      
      this.message = 'No se encontraron datos'
      this.presentToast(this.message);
    }

  }

  descargarPDF() {

  }
  

  nombreMes($event) {
    this.buscar = false;
    
    
  }
  
  changeAnio($event) {
    const anio = parseInt($event.detail.value.substr(0 , [4]));
    this.anio = anio;
    this.buscar = false;
    
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

  async presentToast(ms: string) {
    let seg = 3000;

    if(ms !== 'No se encontraron datos') {  seg = 7000; }

    const toast = await this.toastController.create({
      message: ms,
      duration: seg,
      cssClass:"background"
    });

    toast.present();
  }

}
