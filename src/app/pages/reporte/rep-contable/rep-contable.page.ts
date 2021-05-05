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
//import { Share } from '@capacitor/core';
import { File as ionFile, } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Share, FileSharer } = Plugins;

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

/*   columns                           = [];
  displayedColumns       : string[] = []; */
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
    public  toastController     : ToastController,
    private file                : ionFile,
    private fileOpener          : FileOpener,


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
  
          /* const columns = result[0];                                            
          const keys = Object.keys(columns);

          for (let i of keys) {
            this.columns.push({ titulo: i });
            this.displayedColumns.push(i);
          } */
  
          this.data = result;
          this.buscar = true;
          this.noShare  = false;
  
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
        //this.sfunction.exportToExcel(this.data, name_file);        
        //const r = this.sfunction.exportarExcelIonic( this.data, name_file);
        //this.shared3(r);
        console.log(this.data[0]);
        this.enviarCorreo();

         
      } else {        
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


  private escribirArchivo( res, fileName, ext ) {

    const { Filesystem } = Plugins;        
    const bs = res.result;

    Filesystem.writeFile({
      path: `${fileName}.${ext}`,
      data: bs,
      directory: FilesystemDirectory.Documents,      
      encoding:  FilesystemEncoding.UTF8

    }).then(writeFileResponse => {

      this.rutaArchivo = writeFileResponse.uri;
        console.log(JSON.stringify(writeFileResponse));

        this.message = 'El documento se descargó correctamente.';
        this.spinner.hide();
        this.presentToast(this.message);
        
    }, error => {
        console.log('writeFile error => ', error);
        this.message = 'No se pudo descargar el documento.';
        this.spinner.hide();
        this.presentToast(this.message);
    });

  }

  async shared3( blob) {

    console.log('haciendo click');
   
    const fileName = `Test Archivo.xlsx`;
    const reader = new FileReader();
   
    reader.onloadend = function() {
      const { Filesystem } = Plugins;    
      
      const url = reader.result as string;
      const base64 = url.split(',')[1];
      
      Filesystem.writeFile({
        path: `Test Excel.xlsx`,
        data: base64,
        directory: FilesystemDirectory.Documents,
      }).then(writeFileResponse => {
          
          console.log(writeFileResponse.uri);                      
          
      }, error => {
          console.log('writeFile error => ');
          console.log(JSON.stringify(error));
      });
      
    }
    reader.readAsDataURL(blob); 
          
          /* reader.onloadend = () => {

            FileSharer.share({
              filename: fileName,
              baseData: base64,
              contentType: 'application/pdf'
              }).then(() => {
              // do sth 
                console.log('okays xd')
              }).catch(error => {
                  console.error("File sharing failed");
                  console.error(JSON.stringify(error.message));
              });

          }
 */
    


    

  }
  

  enviarCorreo() {

    const arrTemp = [];
    const titulos = 'CODIGO CLIENTE, CUO, EXONERADAS, EXPORTACIÓN, FECHA EMISIÓN, FECHA VENCIMIENTO, GRAVADAS, IDAnuladoEniado, IDEnviado, IGV, INAFECTO, ISC, NÚMERO, NÚMERO RELACIONADO, OTROS TRIBUTOS, RAZÓN SOCIAL & NOMBRE, RUC O DNI, SERIE, SERIE RELACIONADA, TIPO, TIPO DOCUMENTO RELACIONADO, TIPO MONEDA, TOTAL\n';

    arrTemp.push( titulos );

    this.data[0].forEach( r => {

      const linea = `${ r['CODIGO CLIENTE'] }, ${ r['CUO'] }, ${ r['EXONERADAS'] }, ${ r['EXPORTACIÓN'] }, ${ r['FECHA EMISIÓN'] }, 
      ${ r['FECHA VENCIMIENTO'] }, ${ r['GRAVADAS'] }, ${ r['IDAnuladoEnviado'] }, ${ r['IDEnviado'] }, ${ r['IGV'] }, ${ r['INAFECTO'] }, ${ r['ISC'] }, 
      ${ r['NÚMERO'] }, ${ r['NÚMERO RELACIONADO'] }, ${ r['OTROS TRIBUTOS'] }, ${ r['RAZÓN SOCIAL & NOMBRE'] }, ${ r['RUC O DNI'] }, ${ r['SERIE'] }, 
      ${ r['SERIE RELACIONADA'] }, ${ r['TIPO'] }, ${ r['TIPO DOCUMENTO RELACIONADO'] }, ${ r['TIPO MONEDA'] }, ${ r['TOTAL']}\n`;

      arrTemp.push( linea );

    });

    this.crearArchivoFisico( arrTemp.join('') );

  }

  crearArchivoFisico( text: string ) {

    this.file.checkFile( this.file.dataDirectory, 'registros.csv' )
      .then( existe => {
        console.log('Existe archivo?', existe );
        return this.escribirEnArchivo( text );
      })
      .catch( err => {

        return this.file.createFile( this.file.dataDirectory, 'registros.csv', false )
                .then( creado => this.escribirEnArchivo( text ) )
                .catch( err2 => console.log( 'No se pudo crear el archivo', err2 ));

      });


  }

  async escribirEnArchivo( text: string ) {
    

    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', text );

    const archivo = `${this.file.dataDirectory}/registros.csv`;
    
    this.fileOpener.showOpenWithDialog(archivo, 'application/csv')
        .then(() => console.log('File is opened'))
        .catch(error => {
          console.log('Error openening file', error);
          console.log(JSON.stringify(error));
        });

  }


  
}
