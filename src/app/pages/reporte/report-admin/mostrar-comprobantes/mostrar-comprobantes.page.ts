
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Share } from '@capacitor/core';
import { ActionSheetController, AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICondition, IStatus } from 'src/app/models/report.model';


@Component({
  selector: 'app-mostrar-comprobantes',
  templateUrl: './mostrar-comprobantes.page.html',
  styleUrls: ['./mostrar-comprobantes.page.scss']
})
export class MostrarComprobantesPage implements OnInit {

  @Input() listcpe: any[] = [];
  @Input() listcpeGeneral : any[] = [];

  icondition: ICondition = new ICondition();
  istatus: IStatus = new IStatus();

  checkAll : boolean;
  app_bar: boolean;

  constructor(
    public Descargar: ActionSheetController,
    public filtrar: AlertController,
    private modalRepoteAdmin: ModalController,
    private spinner: NgxSpinnerService
  ) { }

  // filtrar datos 
  async Filtros() {

    const alert = await this.filtrar.create({
      cssClass: 'my-custom-class',
      header: 'Filtros',

      inputs: [
        {
          name: 'activo',
          type: 'checkbox',
          label: 'activo',
          value: this.icondition.activo,
          checked: this.icondition.activo,
          handler: () => {
            console.log(alert.inputs);
          }
        },
        {
          name: 'anulado',
          type: 'checkbox',
          label: 'anulado',
          value: this.icondition.anulado,
          checked: this.icondition.anulado,
          handler: () => {
            // console.log(alert.inputs);
          }

        },

        {
          name: 'enviado',
          type: 'checkbox',
          label: 'enviado',
          value: this.istatus.enviado,
          checked: this.istatus.enviado,
          handler: () => {
            // console.log(alert.inputs);
          }
        },

        {
          name: 'No Enviado',
          type: 'checkbox',
          label: 'No Enviado',
          value: this.istatus.not_enviado,
          checked: this.istatus.not_enviado,
          handler: () => {
            // console.log(alert.inputs);
          }
        },
        {
          name: 'f',
          type: 'checkbox',
          label: 'fdffff',
          value: this.istatus.not_enviado,
          checked: this.istatus.not_enviado,
          handler: () => {
            this.reestablecer();
          }

        }
      ],

      buttons: [
        {
          text: 'Restablecer',
          cssClass: 'secondary',
          handler: () => {
            this.reestablecer();

            // console.log('alert: ', alert)
            // // alert.inputs

            // const keys1 = Object.keys( this.icondition );
            // const keys2 = Object.keys( this.istatus );
            // const keys = keys1.concat(keys2);

            // keys.forEach( elm =>{

            //   alert.inputs.forEach( el =>{

            //     if( el.name === elm ){


            //       // debugger
            //       const value = this.icondition[elm] ?? this.istatus[elm]
            //       el.checked = value
            //       el.value = value
            //       console.log(alert.inputs);
            //     }
            //   })

            // })

            return false;
          },
        },
        {
          text: 'Hecho',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();


  }

  // Compartir comprobante
  async shared() {

    const listShared = this.listcpe.filter(x => x.isChecked === true)
    console.log(listShared);


    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });
  }


  // descargar Comprobante   
  async descargar() {
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
  }
  ngOnInit() { }

  ToselectAll() {

    this.checkAll = !this.checkAll;

    this.spinner.show();
    this.listcpe.forEach(el => { el.isChecked = this.checkAll })
    this.spinner.hide();
  }

  atras() {
    this.modalRepoteAdmin.dismiss();
  }

  reestablecer() {

    debugger
    this.icondition.activo = false;
    this.icondition.anulado = false;

    this.istatus.enviado = false;
    this.istatus.not_enviado = false;
  }



  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  loadData(event) {

    console.log('Cargando ......')

    setTimeout(() => {
      
      if( this.listcpe.length === this.listcpeGeneral.length ){
        event.target.complete();
        this.infinityScroll.disabled = true;
        return;
      }

      const cant = this.listcpe.length + 20;
      const nuevoArr = this.listcpeGeneral.slice(0, cant);
      this.listcpe = nuevoArr;
      event.target.complete();
    }, 1000);


  }

}

