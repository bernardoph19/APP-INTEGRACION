import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';

@Component({
  selector: 'app-rep-contable',
  templateUrl: './rep-contable.page.html',
  styleUrls: ['./rep-contable.page.scss'],
})
export class RepContablePage implements OnInit {
  
  buscar   : boolean = false;
  form     : FormGroup;
  message  : string;
  error    : boolean;
  cnn_expi : boolean;
  expiredS : boolean;
  sinDatos : boolean = false;

  columns                           = [];
  displayedColumns       : string[] = [];
  data                   : any; 
  
  anio     : string;  
  mes      : string;

  prueba : string = 'HOALA';

  constructor(
    private sformValidator      : FormValidatorService,
    private fb                  : FormBuilder,
    private spinner             : NgxSpinnerService,
    private sreportVenta        : ReporteVentaService,
    private sfunction           : FunctionsService,
    private dataStorageService  : DataStorageService,
    private router              : Router,
    private salert              : AlertService,


  ) {
    this.createForm();

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
    
    this.error = false;
    this.message = null;
    /* 
    this.cnn_expi = false;
    this.dataSource = null;
    this.columns = [];
    this.displayedColumns = []; 
    */
  }

  get yearInvalid() {
    return this.sformValidator.control_invalid('anio', this.form);
  }

  get monthInvalid() {
    return this.sformValidator.control_invalid('mes', this.form);
  }

  shared(){
    
  }

  async descargarExcel() {
    
    try 
    {
      if(this.data.length < 1)
      {
        this.error = true;
        this.message = 'No se encontraron datos'
        return;
      }

      const ruc = await this.dataStorageService.get('credenciales');
      this.anio = this.form.value.anio;
      this.mes = this.form.value.mes;
      const name_file = `${ruc.ruc}-${this.anio}-${this.mes}`;

      const Noenviados = this.data.filter((e:any)=>
      { 
        if(e['RAZÓN SOCIAL & NOMBRE'] == 'ANULADO' ) { if(e.IDAnuladoEnviado == false ) return e; }
        else if(e.IDEnviado == false ) return e;
      });

      if(Noenviados.length == 0) this.sfunction.exportToExcel(this.data, name_file)
      else
      {
        this.error = true;
        this.message = 'Algunos comprobantes aun no han sido enviados, envie todos los comprobantes de el mes seleccinado para poder exportar a excel'
      }
    } 
    catch (error) 
    {
      this.error = true;
      this.message = 'No se encontraron datos'
    }

  }

  descargarPDF() {

  }


  async listReporteContable() {

    if (this.form.invalid) {
      return this.sformValidator.Empty_data(this.form);
    }

    this.initialize();
    const body = {
      ... this.form.value
    };

    
    (await this.sreportVenta.ContableReport(body)).subscribe((response: any) => {
      

      if(response.message == 'exito')
      {
        const result = response.result;
        if (result.length > 0) {
          this.anio = this.form.value.anio;
          this.mes = this.form.value.mes;       
  
          const columns = result[0];                                            
          const keys = Object.keys(columns);

          for (let i of keys) {
            this.columns.push({ titulo: i });
            this.displayedColumns.push(i);
          }
  
          this.data = result;
          this.buscar = true;
          this.sinDatos = false;
  
        } else {
          this.sinDatos = true;


        }
      }
      this.spinner.hide();

    }, (error : any) => {

      this.error     = true;
      this.expiredS  = error.error === 'Unauthorized';
      this.message   = (this.expiredS) ? 'Su sesion Expiró, Inicie sesion nuevamente.' : (error.error.menssage)  ?? 'Sin conexion al servidor';
       
      this.spinner.hide();
      const title = 'Oops!!!';
      (this.expiredS) ? this.salert.Alert( title, this.message, this.sExpiredNav(this) )
                      : this.salert.Alert( title, this.message, '' );

    });

  }

  sExpiredNav(self : any) {
    debugger;
    this.dataStorageService.clearAllStorage();
    this.router.navigate(['/login'],  { replaceUrl: true });    
  }

  nombreMes($event) {
    

  }

  buscarContable() {

  }

}
