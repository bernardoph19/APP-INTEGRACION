import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-detalle-comprobante',
  templateUrl: './detalle-comprobante.page.html',
  styleUrls: ['./detalle-comprobante.page.scss'],
})
export class DetalleComprobantePage implements OnInit {

  estadocompro                   : boolean;
  @Input() itemCPE               : any;  
  //itemCPE                     : any;


  constructor( 
    public Descargar            : ActionSheetController,
    private http                : HttpClient,
    private route               : ActivatedRoute,
    private dataStorageService  : DataStorageService,
    private modal               : ModalController,
    private sreportVenta        : ReporteVentaService,
    private spinner             : NgxSpinnerService,

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




}
