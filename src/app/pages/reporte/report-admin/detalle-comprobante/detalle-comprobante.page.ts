import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { IComprobante } from 'src/app/interfaces/cpe';
import { FunctionsService } from 'src/app/services/functions.service';

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { File as ionFile, } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

const  { Share, FileSharer } = Plugins;
import { Buffer } from 'buffer';
import { ToastService } from 'src/app/services/toast.service';


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
  rutaArchivo                    : any;
  sharePDF                       : boolean = false;
  base64PDF                      : any;
  

  constructor( 
    public Descargar            : ActionSheetController,
    private dataStorageService  : DataStorageService,
    private modal               : ModalController,
    private sreportVenta        : ReporteVentaService,
    private spinner             : NgxSpinnerService,
    private salert              : AlertService,
    private alert               : AlertController,
    private sfunction           : FunctionsService,
    private file                : ionFile,
    private social              : SocialSharing,
    private fileOpener          : FileOpener,
    private stoast              : ToastService,

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
  
  async shared() {

    const fileName = `${this.FileAsBody.ruc}-${this.FileAsBody.codigoComprobante}-${this.FileAsBody.serie}-${this.FileAsBody.numero}.pdf`;

    FileSharer.share({
      filename: fileName,
      baseData: this.base64PDF,
      contentType: 'application/pdf'
    }).then(() => {
      // do sth 
        console.log('okays xd')
      }).catch(error => {
          console.error("File sharing failed");
          console.error(JSON.stringify(error.message));
      });
  }
  
  /* async shared3() {

    console.log('haciendo click');

    const fileName = `${this.FileAsBody.ruc}-${this.FileAsBody.codigoComprobante}-${this.FileAsBody.serie}-${this.FileAsBody.numero}.pdf`;
    
    
    this.http.get(this.rutaArchivo, { responseType: 'blob'})
        .subscribe(res => {
          const reader = new FileReader();
          
          reader.onloadend = () => {
              const result = reader.result as string;
              const base64 = result.split(',')[1];

              console.log(JSON.stringify(base64));
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

          
          reader.readAsDataURL(res);
        })

  } */

  async shared2() {

    console.log('haciendo click');

    const fileName = `${this.FileAsBody.ruc}-${this.FileAsBody.codigoComprobante}-${this.FileAsBody.serie}-${this.FileAsBody.numero}.pdf`;

    const blob = this.sfunction.base64toBlob(this.base64PDF, { type: `application/pdf` });

    Plugins.FileSharer.share({
      filename: fileName,
      baseData: blob,
      contentType: 'application/pdf'
    }).then(() => {      
      console.log('okays xd')
    }).catch(error => {
        console.error("File sharing failed");
        console.error(JSON.stringify(error.message));
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
          handler: () => {
            this.getBase64PDF();
          }

        }, 
        {
          text: 'XLM',
          icon: 'download',
          handler: () => { 
            this.getBase64XML();
          }

        },
        {
          text: 'CDR',
          icon: 'download',
          handler: () => {
            this.getBase64CDR();
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

  downloadPdf() {

    const { Filesystem } = Plugins;
      
      const fileName = `${this.FileAsBody.ruc}-${this.FileAsBody.codigoComprobante}-${this.FileAsBody.serie}-${this.FileAsBody.numero}.pdf`;
      
      try {
        Filesystem.writeFile({
          path: fileName,
          data: this.base64PDF,
          directory: FilesystemDirectory.Documents,
          //encoding: FilesystemEncoding.UTF8
        }).then((get) => {
          
          this.fileOpener.showOpenWithDialog(get.uri, 'application/pdf')          
              .then(() => console.log('File is opened'))
              .catch(error => {
                console.log('Error openening file', error);
                console.log(JSON.stringify(error));
              });

        });
        
      } catch (error) {
        console.error('Unable to write file');
        console.log(JSON.stringify(error));        
        this.stoast.showToastShort('No se pudo leer el documento.');        
      }
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
    
    if (email.length > 0) {
      
      let emails = email.join(',');
    
      const parametro = {
        codigocomprobante : this.itemCPE.CodigoComprobante,
        serie             : this.itemCPE.Serie,
        numero            : this.itemCPE.Numero,
        correos           : emails
      }

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
              console.log('Cancelar');


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

        const fileName = `${this.FileAsBody.ruc}-${this.FileAsBody.codigoComprobante}-${this.FileAsBody.serie}-${this.FileAsBody.numero}`;
        const bs64 = response;
        this.base64PDF = response.result;

        this.escribirArchivo(bs64, fileName, 'pdf');

      } else {

        this.tittle = ' Ocurrió algo :c '
        this.message = response.message ?? "Sin conexion al servidor";
        this.error = true;
        this.spinner.hide();
        this.stoast.showToastShort(this.message);
      }
      
    }, (error) => {

      this.tittle = ' Ocurrió algo :c '
      this.message = error.error.message ?? "Sin conexion al servidor";
      this.error = true;
      this.spinner.hide();
      this.stoast.showToastShort(this.message);

    })

  }

  getBase64CDR() {
    
    this.initialize();
    
    const body = { ... this.FileAsBody };

    this.sreportVenta.cdr(body).subscribe((response: any) => {

      if (response.exito) {        
        
        const fileName = `${this.FileAsBody.ruc}-${this.FileAsBody.codigoComprobante}-${this.FileAsBody.serie}-${this.FileAsBody.numero}`;
        const bs64 = response;

        this.escribirArchivo(bs64, fileName, 'cdr');
        
      } else {

        this.message = response.message ?? "Sin conexion al servidor";
        this.error = true;
        this.stoast.showToastShort(this.message);

      }

    }, (error) => {

      this.message = error.error.message ?? "Sin conexion al servidor";
      this.error = true;
      this.spinner.hide();
      this.stoast.showToastShort(this.message);

    });

  }
  
  getBase64XML() {
    
    this.initialize();    
    const body = { ... this.FileAsBody };


    this.sreportVenta.xml(body).subscribe((response: any) => {

      if (response.exito) {
                
        const fileName = `${this.FileAsBody.ruc}-${this.FileAsBody.codigoComprobante}-${this.FileAsBody.serie}-${this.FileAsBody.numero}`;
        const bs64 = response;        
        this.escribirArchivo(bs64, fileName, 'xml');
        
      } else {

        this.message = response.message ?? "Sin conexion al servidor";
        this.error = true;
        this.spinner.hide();
        this.stoast.showToastShort(this.message);

      }

    }, (error) => {

      this.message = error.error.message ?? "Sin conexion al servidor";
      this.error = true;
      this.spinner.hide();
      this.stoast.showToastShort(this.message);

    });

  }
  
  private escribirArchivo( res : any, fileName : string, ext : string ) {

    const { Filesystem } = Plugins;    
    const extension = (ext === 'cdr') ? 'zip' : ext;
    const bs = res.result;

    Filesystem.writeFile({
      path: `${fileName}.${extension}`,
      data: bs,
      directory: FilesystemDirectory.Documents,      
    }).then(writeFileResponse => {
      if(ext == 'pdf'){ this.sharePDF = true; }
      

      this.rutaArchivo = writeFileResponse.uri;
        console.log(JSON.stringify(writeFileResponse));

        this.message = writeFileResponse.uri;
        this.spinner.hide();
        this.stoast.showToastShort(this.message);
        
    }, error => {
        console.log('writeFile error => ', error);
        this.message = 'No se pudo descargar el documento.';
        this.spinner.hide();
        this.stoast.showToastShort(this.message);
    });

  }    
 
}
