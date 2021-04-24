import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { DetalleComprobantePageModule } from './detalle-comprobante.module';


@Component({
  selector: 'app-detalle-comprobante',
  templateUrl: './detalle-comprobante.page.html',
  styleUrls: ['./detalle-comprobante.page.scss'],
})
export class DetalleComprobantePage implements OnInit {

  estadocompro                   : boolean;
  @Input() itemCPE               : any      = [];  
  mostrarDatos                   : boolean;
  enviar                         : boolean = false;
  correoElec                     : string[] = [];
  condicionCPE                   : string;
  seleccionado                   : string;
  disabled                       : boolean;   
  

  constructor( 
    public Descargar            : ActionSheetController,
    private http                : HttpClient,
    private route               : ActivatedRoute,
    private dataStorageService  : DataStorageService,
    private modal               : ModalController,
    private sreportVenta        : ReporteVentaService,
    private spinner             : NgxSpinnerService,
    private salert              : AlertService,
    private alert               : AlertController,

  ) { 
    
    
    
    
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

      buttons: [{
        text: 'PDF',
        role: 'destructive',
        cssClass: 'pdf',
        icon: 'download',
        handler: () => {
          console.log('Delete clicked');
        }

      }, {
        text: 'XLM',
        icon: 'download',
        handler: () => {
          console.log('Share clicked');
        }

      },
      {
        text: 'CDR',
        icon: 'download',
        handler: () => {
          console.log('Play clicked');
        }
      },
      ]
    });
    await actionSheet.present();
  }

  async ngOnInit() {    
    this.evaludarDatos();
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

  evaludarDatos() {
    //select
    this.seleccionado = this.itemCPE.Anulado ? 'anulado' : 'activo'
    this.disabled =  this.itemCPE.Anulado;

    this.enviar = (!this.itemCPE.Anulado && this.itemCPE.Enviado) || (this.itemCPE.Anulado && this.itemCPE.Enviado && this.itemCPE.AnuladoEnviado);
    this.mostrarDatos = this.enviar;

    if(this.itemCPE.Correo != null && this.itemCPE.Correo.toString().trim() != '') {

      if(this.itemCPE.Correo.toString().trim() != '')
      {
        const caadenaCorreo = this.itemCPE.Correo.toString().trim();
        const correos = caadenaCorreo.split(',');
        for (let i = 0; i < correos.length; i++) this.correoElec.push(correos[i]);
      }
    }

  }

  cambiarEstado($event : any) {
    const val = $event.detail.value;
    if (val == 'anulado') {
      this.seleccionado = 'anulado';
      
    } else {
      this.seleccionado = 'activo';
    }
    
    this.anularComprobante();
  }



  async obtenerCorreos($event) {

    const email = $event.detail.value;
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
          text    : 'OK',
          handler : () => { 
            console.log('OK')
            this.spinner.show();
            
            setTimeout(() => {
              this.spinner.hide();
            }, 2000);

          }
        },
        {
          role: 'cancel',
          cssClass: 'secondary',
          text    : 'Cancelar',
          handler : () => {
            console.log('Cancelar')
          }
        }
      ] 
    });

    alert.present();  
        
  }

  async anularComprobante() {

    const alert = await this.alert.create({
      cssClass : 'alert',
      header   : 'Aviso',
      message  : '¿ Desea Anular el comprobante ?',
      backdropDismiss : false,
      buttons  : [
        {
          text    : 'OK',
          handler : () => { 
            console.log('OK')
          }
        },
        {
          role: 'cancel',
          cssClass: 'secondary',
          text    : 'Cancelar',
          handler : () => {
            console.log('Cancelar')
          }
        }
      ] 
    });

    alert.present();  
    
    /* this.spinner.show();
    this.evaludarDatos();
    this.spinner.hide(); */
  }
 

}
