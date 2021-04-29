

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Share } from '@capacitor/core';
import { ActionSheetController, AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICondition, IStatus } from 'src/app/models/report.model';
import { AlertService } from 'src/app/services/alert.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ReporteVentaService } from 'src/app/services/reporte-venta.service';
import { DetalleComprobantePage } from '../detalle-comprobante/detalle-comprobante.page';
import { FiltrarReportAdminComponent } from '../filtrar-report-admin/filtrar-report-admin.component';


@Component({
  selector: 'app-mostrar-comprobantes',
  templateUrl: './mostrar-comprobantes.page.html',
  styleUrls: ['./mostrar-comprobantes.page.scss']
})
export class MostrarComprobantesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infinityScroll : IonInfiniteScroll;
  @Input() listcpe                             : any[] = [];
  @Input() listcpeGeneral                      : any[] = [];
  listaFiltrada                                : any[] = [];

  ArrayFiltro:any = {
    activo: true,
    anulado: true,
    enviado: true,
    noenviado: true
  };

  icondition              : ICondition = new ICondition();
  istatus                 : IStatus    = new IStatus();
  filtroActivo            : boolean    = false;

  checkAll                : boolean;
  app_bar                 : boolean;  

  title                   : string;
  message                 : string;
  total                   : number;

  constructor(
    public  Descargar         : ActionSheetController,
    public  filtrar           : AlertController,
    private spinner           : NgxSpinnerService,
    public  dialog            : MatDialog,
    private modalEditNombRe   : ModalController,
    private dataStorageService: DataStorageService,
    private sreportVenta      : ReporteVentaService,
    private salert            : AlertService,

  ) { }

  ngOnInit() { 
    this.total = this.listcpeGeneral.map( x => x.Total ).reduce( ( t, a ) => t + a );
  }

  onFiltrar() {
    
    this.dialog.open(FiltrarReportAdminComponent, { data: this.ArrayFiltro })
      .afterClosed()
      .subscribe(dato => {

        this.ArrayFiltro = dato;
        
        const activo = dato.activo;
        const anulado = dato.anulado;
        const enviado = dato.enviado;
        const noenviado = dato.noenviado;

        if(activo & anulado & enviado & noenviado) {
          
          this.filtroActivo = false; // igualar al json de antes
          this.listcpe      = this.listcpeGeneral;

          if(this.listcpe.length != 0) { 
            this.total = this.listcpe.map( x => x.Total ).reduce( ( t, a ) => t + a );
          } else {
            this.total =  0.00;
          }

          this.spinner.hide();

        } else {

          this.filtroActivo   = true;
          this.listaFiltrada  = this.listcpeGeneral.filter( (e : any) => {

            if(activo & anulado)  {              
              if(e.IDEnviado == enviado) return e;

            } else if( enviado & noenviado ) {
              if((e.Cliente == 'ANULADO') == anulado)return e;

            } else {
              if((e.Cliente == "ANULADO") == anulado && e.IDEnviado == enviado)
                return e;
              }
          });
          
          this.listcpe = this.listaFiltrada.slice(0, 20);

          const a = this.listcpeGeneral.filter((e:any)=>{

            if(activo & anulado) {
              if(e.IDEnviado == enviado) return e;

            } else if( enviado & noenviado ) {
              if((e.Cliente == 'ANULADO') == anulado)return e;

            } else {
              if((e.Cliente == "ANULADO") == anulado && e.IDEnviado == enviado)
                return e;
            }
          })

          if(a.length!=0) {
            this.total = a.map( x=>x.Total ).reduce( ( t, a ) => t + a );
          } else {
            this.total = 0.00;
            
          }

        }

        this.spinner.hide();

      })
  }

  // Compartir comprobante
  /* async shared() {

    const listShared = this.listcpe.filter(x => x.isChecked === true)
    console.log(listShared);

    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });
  } */

  // descargar Comprobante   
  /* async descargar() {
    const actionSheet = await this.Descargar.create({
      header: 'Descargar como',
      cssClass: 'my-custom-class',

      buttons: [{
        text: 'PDF',
        role: 'destructive',
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
  } */

  // seleccionar todos los checks box xd
  /* ToselectAll() {
    this.spinner.show();
    this.checkAll = !this.checkAll;
    this.listcpeGeneral.forEach(el => { el.isChecked = this.checkAll });
    this.listcpe = this.listcpeGeneral;
    this.spinner.hide();
  } */

  closeModal() {
    this.modalEditNombRe.dismiss(MostrarComprobantesPage);
  }

  loadData(event : any) {

    let cant     = 0;
    let nuevoArr : any;

    setTimeout(() => {

      if (this.filtroActivo) {

        if (this.listcpe.length === this.listaFiltrada.length) {
          event.target.complete();
          this.infinityScroll.disabled = true;
          return;
  
        }

        cant      = this.listcpe.length + 20;
        nuevoArr  = this.listaFiltrada.slice(0, cant);      
        this.listcpe    = nuevoArr;
        debugger
        event.target.complete();
        
      } else {

        if (this.listcpe.length === this.listcpeGeneral.length) {
          event.target.complete();
          this.infinityScroll.disabled = true;
          return;
  
        }
        cant      = this.listcpe.length + 20;
        nuevoArr  = this.listcpeGeneral.slice(0, cant);      
        this.listcpe    = nuevoArr;
        event.target.complete();

      }
      
    }, 2000);
  }

  // mostar Detalle Comprobante
  async detalleComprobante(item: any) {

    this.spinner.show();

    (await this.getDetails(item).then(r => r)).subscribe( async (dt) =>{
      
      if (dt !== null) {

        if (dt['exito'] == true) {
          
          const modal = await this.modalEditNombRe.create({
            component: DetalleComprobantePage,
            componentProps: { itemCPE: dt['result'][0] }
          });

          this.spinner.hide();
          await modal.present();

        } else {
          this.spinner.hide();
          this.title = 'Oops :c !';
          this.message = dt['message'];
          this.salert.Alert(this.title, this.message, '');
        }

      } else {
        this.spinner.hide();
        this.title = 'Ocurrio algo inesperado :c !';
        this.message = 'Revise su conexión a internet, vuelva a intentarlo.';
        this.salert.Alert(this.title, this.message, '');
      }
      
    })

  }


  async getDetails(item: any) {

    const res = await (this.dataStorageService.get('credenciales'));

    const bdetr = {
      serie: item.Serie,
      numero: item.Numero,
      codigoComprobante: item.Tipo,
      ruc: res.ruc
    };

    return this.sreportVenta.AdministrativeReportDetalle(bdetr);

  }

}

