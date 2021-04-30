import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { IComprobante } from 'src/app/interfaces/cpe';
import { FunctionsService } from 'src/app/services/functions.service';

import { Share, Plugins, FilesystemDirectory } from '@capacitor/core';
import { File as ionFile} from '@ionic-native/file/ngx';


@Component({
  selector: 'app-detalle-comprobante',
  templateUrl: './detalle-comprobante.page.html',
  styleUrls: ['./detalle-comprobante.page.scss'],
})
export class DetalleComprobantePage implements OnInit {
  
  @Input() itemCPE               : any      = [];  
  
  FileAsBody                     = {} as IComprobante;
  mostrarDatos                   : boolean;
  enviar                         : boolean = false;
  correoElec                     : string[] = [];
  
  seleccionado                   : string;    
  tittle                         : string;
  message                        : string;
  disabled                       : boolean;   
  error                          : boolean;
  success                        : boolean;

  credenciales                   : any;  
  

  constructor( 
    public Descargar            : ActionSheetController,
    private dataStorageService  : DataStorageService,
    private modal               : ModalController,
    private sreportVenta        : ReporteVentaService,
    private spinner             : NgxSpinnerService,
    private salert              : AlertService,
    private alert               : AlertController,
    private sfunction           : FunctionsService,
    public  toastController     : ToastController,
    private file                : ionFile,

  ) {        
   }
  
  initialize() {
    this.spinner.show();
    this.error = false;
    this.success = false;
    this.message = null;
  }
  
  private downloadFile( response : any, typeFile:string ){

    const extension = typeFile === 'cdr' ? 'zip' : typeFile;
    const bs64 = response.result;
    const blob = this.sfunction.base64toBlob(bs64, { type: `application/${typeFile}` });
    const name_Archivo = `${this.FileAsBody.ruc}-${this.FileAsBody.codigoComprobante}-${this.FileAsBody.serie}-${this.FileAsBody.numero}.${extension}`;
    this.sfunction.downloadFile(blob, name_Archivo);
    this.spinner.hide();
  }
  
  async shared(){

   await Share.share({
    title: 'See cool stuff',
    text: 'Really awesome thing you need to see right meow',
    url: 'http://ionicframework.com/',
    dialogTitle: 'Share with buddies'
  });
  }

  async descargar() {
    

    const actionSheet = await this.Descargar.create({
      header: 'Descargar como',
      cssClass: 'my-custom-class',

      buttons: [
        {
          text: 'PDF',
          role: 'destructive',
          cssClass: 'pdf',
          icon: 'download',
          handler: () => {  /* this.dowloadFilepdf() ; */ 
            this.getBase64PDF();
          }

        }, 
        {
          text: 'XLM',
          icon: 'download',
          handler: () => {  /* (Enviado) ?  this.dowloadFilepdf() :  this.salert.Alert('Ops ...', 'Operación no permitida', ''); */
            this.downloadFilexml();
          }

        },
        {
          text: 'CDR',
          icon: 'download',
          handler: () => {
            this.downloadFilecdr();
          }
        },
      ]
    });

    await actionSheet.present();

  }

  ngOnInit() {    
    this.leerDatos();
  }
   
  // Cerrar modal sin datos
  cancelar() {
    this.modal.dismiss();
  }
  
  // Cerrar modal con datos
  guardar() {
    this.modal.dismiss({  
    });
  }

  async leerDatos() {
    console.log(this.itemCPE);

    this.credenciales   = await this.dataStorageService.get('credenciales');    
    this.seleccionado = this.itemCPE.Anulado ? 'Anulado' : 'Activo'
    this.disabled     =  this.itemCPE.Anulado;
    this.enviar       = (!this.itemCPE.Anulado && this.itemCPE.Enviado) || (this.itemCPE.Anulado && this.itemCPE.Enviado && this.itemCPE.AnuladoEnviado);
    this.mostrarDatos = this.enviar;    

    if(this.itemCPE.Correo != null && this.itemCPE.Correo.toString().trim() != '') {

      if(this.itemCPE.Correo.toString().trim() != '')
      {
        const caadenaCorreo = this.itemCPE.Correo.toString().trim();
        const correos = caadenaCorreo.split(',');
        for (let i = 0; i < correos.length; i++) this.correoElec.push(correos[i]);
      }
    }

    this.FileAsBody.serie             = this.itemCPE.Serie;
    this.FileAsBody.numero            = this.itemCPE.Numero;
    this.FileAsBody.codigoComprobante = this.itemCPE.CodigoComprobante;
    this.FileAsBody.client            = this.itemCPE.ClienteDenominacion;
    this.FileAsBody.ruc               = this.credenciales.ruc;
    

  }
 
  async obtenerCorreos($event) {

    const email = $event.detail.value;
    
    debugger
    if (email.length > 0) {
      
      
      let emails = email.join(',');    
    
      const parametro = {
        codigocomprobante : this.itemCPE.CodigoComprobante,
        serie             : this.itemCPE.Serie,
        numero            : this.itemCPE.Numero,
        correos           : emails
      }

      console.log(parametro);

      const alert = await this.alert.create({
        cssClass : 'alert',
        header   : 'Envio Correos',
        message  : '¿ Desea enviar este comprobante ?',
        backdropDismiss : false,
        buttons  : [
          {
            role: 'cancel',
            cssClass: 'secondary',
            text    : 'NO',
            handler : () => {
              console.log('Cancelar')
            }
          },
          {
            text    : 'SI',
            handler : () => { 
              
              this.spinner.show();
              this.resSendEmail(parametro);

            }
          }
        ] 
      });

      alert.present(); 

    } else {
      console.log('estoy vacio');
      
    }
        
  }

  resSendEmail(parametro : any) {

    this.sreportVenta.send_email( parametro ).subscribe( (response : any ) =>{

      if( response.exito ){
       this.success = true;
       this.message = 'el correo se envio Exitosamente';
       this.salert.Alert('Exito', this.message, '');
      }
      else {
        this.error = true;
        this.message = 'Operacion incorrecta';
        this.salert.Alert('Ops ..!', this.message, '');
      }
              
      this.spinner.hide();
    }, (error)=>{

      this.message = error.error.message ?? "Sin conexion al servidor";
      this.salert.Alert('Aviso!', this.message, '');
      this.error = true;
      this.spinner.hide();

    });
  }

  async enviarComprobanteSunat() {    
    //estadocompro = !estadocompro

    this.initialize();
    const body = {
      ... this.FileAsBody
    }

    body.produccion = true;

    this.sreportVenta.send_sunat(body).subscribe((response: any) => {

      if (response.exito) {
        this.getDetailAPI();
      }
      else {

        this.message  = response.message ?? "Sin conexion al servidor";
        this.tittle   = 'Aviso :c';
        this.error    = true;
        this.spinner.hide();
        this.salert.Alert(this.tittle, this.message, '');

      }

    }, (error) => {

      this.tittle  = 'Aviso :c';
      this.message = error.error.message ?? "Sin conexion al servidor";
      this.error = true;
      this.spinner.hide();
      this.salert.Alert(this.tittle, this.message, '');
      
    })
    
  }


  dowloadFilepdf() {

    this.initialize();
    const body = { ... this.FileAsBody };
    debugger

    this.sreportVenta.pdf(body).subscribe((response: any) => {
      if (response.exito) this.downloadFile( response, 'pdf' );
      else {

        this.tittle = ' Ocurrió algo :c '
        this.message = response.message ?? "Sin conexion al servidor";
        this.error = true;
        this.spinner.hide();
      }
      
    }, (error) => {

      this.tittle = ' Ocurrió algo :c '
      this.message = error.error.message ?? "Sin conexion al servidor";
      this.error = true;
      this.spinner.hide();

    })
  }

  downloadFilexml() {

    if(!this.enviar){
      this.salert.Alert('Ops ...', 'Operación no permitida', '');
      return;
    }

    this.initialize();
    const body = {
      ... this.FileAsBody
    };

    this.sreportVenta.xml(body).subscribe((response: any) => {

      if (response.exito) this.downloadFile( response, 'xml' );
      else {

        this.message = response.message ?? "Sin conexion al servidor";
        this.error = true;

      }

      this.spinner.hide();

    }, (error) => {

      this.message = error.error.message ?? "Sin conexion al servidor";
      this.error = true;
      this.spinner.hide();

    });

  }

  downloadFilecdr() {

    if(!this.enviar){
      this.salert.Alert('Ops ...', 'Operación no permitida', '');
      return;
    }

    this.initialize();
    const body = {
      ... this.FileAsBody
    };

    this.sreportVenta.cdr(body).subscribe((response: any) => {

      if (response.exito) this.downloadFile( response, 'cdr' );
      else {

        this.message = response.message ?? "Sin conexion al servidor";
        this.error = true;

      }

      this.spinner.hide();

    }, (error) => {

      this.message = error.error.message ?? "Sin conexion al servidor";
      this.error = true;
      this.spinner.hide();

    })

  }  

  async getDetails(item: any) {

    const res = await (this.dataStorageService.get('credenciales'));
    
    const bdetr = {
      serie: item.Serie,
      numero: item.Numero,
      codigoComprobante: item.CodigoComprobante,
      ruc: res.ruc
    };

    return this.sreportVenta.AdministrativeReportDetalle(bdetr);

  }

  async getDetailAPI() {
    (await this.getDetails(this.itemCPE)).subscribe((r:any) => { 
      this.itemCPE = r.result[0]; 
      this.spinner.hide();
    })
  }


  getBase64PDF() {
    this.initialize();
    const body = { ... this.FileAsBody };

    this.sreportVenta.pdf(body).subscribe((response: any) => {
      
      if (response.exito){

        const fileName = 'FC Inte CPE.pdf';
        const { Filesystem } = Plugins;
        const bs64 = response.result;


        console.log('siguiente linea directory');
        console.log(JSON.stringify(FilesystemDirectory.Documents));


       /*  this.file.checkFile( this.file.dataDirectory, 'registros.csv' )
            .then( existe => {
              console.log('Existe archivo?', existe );
              return this.escribirEnArchivo( text );
            })
            .catch( err => {

              return this.file.createFile( this.file.dataDirectory, 'registros.csv', false )
                      .then( creado => this.escribirEnArchivo( text ) )
                      .catch( err2 => console.log( 'No se pudo crear el archivo', err2 ));

            }); */


        Filesystem.writeFile({
          path: fileName,
          data: bs64,
          directory: FilesystemDirectory.Documents,
        }).then(writeFileResponse => {
            console.log('writeFile success => ' );
            console.log(JSON.stringify(writeFileResponse));

            this.message = 'El comprobante se descargó correctamente.';
            this.spinner.hide();
            this.presentToast(this.message);
            console.log('okay despues del toast');
            
        }, error => {
            console.log('writeFile error => ', error);
            this.message = 'No se pudo descargar el documento.';
            this.spinner.hide();
            this.presentToast(this.message);
        });

        console.log('siguiendo documento de codigo');
        this.spinner.hide();

      } else {

        this.tittle = ' Ocurrió algo :c '
        this.message = response.message ?? "Sin conexion al servidor";
        this.error = true;
        this.spinner.hide();
        this.presentToast(this.message);
      }
      
    }, (error) => {

      this.tittle = ' Ocurrió algo :c '
      this.message = error.error.message ?? "Sin conexion al servidor";
      this.error = true;
      this.spinner.hide();
      this.presentToast(this.message);

    })

  }

  getPDFFile() {
    

  }

  async escribirEnArchivo( base64 :  any ) {

    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', base64 );

    const archivo = `${this.file.dataDirectory}/FC Inte PDF.pdf`;    
        
  }


  async presentToast(ms: string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 3000,
      cssClass:"background"
    });

    toast.present();
  }

}
