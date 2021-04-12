
import { Component, OnInit } from '@angular/core'; 
import { Share } from '@capacitor/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-comprobantes',
  templateUrl: './mostrar-comprobantes.page.html',
  styleUrls: ['./mostrar-comprobantes.page.scss'],
})
export class MostrarComprobantesPage implements OnInit {

  app_bar: boolean;

  constructor(public Descargar: ActionSheetController, 
    public filtrar: AlertController) {}

  // filtrar datos 
  async Filtros(){
      
      const alert = await this.filtrar.create({
        cssClass: 'my-custom-class',
        header: 'Filtros',
      
        inputs: [

          {
            name: 'activo',
            type: 'checkbox',
            label: 'Activo',
            value: 'value1',
            handler: () => {
              console.log('Checkbox 1 selected');
            },
            checked: true
          },
 
          {
            name: 'Anulado',
            type: 'checkbox',
            label: 'Anulado',
            value: 'value2',
            handler: () => {
              console.log('Checkbox 2 selected');
            }
           
          },

          {
            name: 'Enviado',
            type: 'checkbox',
            label: 'Enviado',
            value: 'value3',
            handler: () => {
              console.log('Checkbox 3 selected');
            }
          },
  
          {
            name: 'No Enviado',
            type: 'checkbox',
            label: 'No Enviado',
            value: 'value4',
            handler: () => {
              console.log('Checkbox 4 selected');
            }
          },          
        ],

        buttons: [
          {
            text: 'Restablecer',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Restablecer');
            }
          }, {
            text: 'Hecho',         
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
      });
  
      await alert.present();
    

  }

  // Compartir comprobante
  async shared(){
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
  ngOnInit() {
  }

 

  


}

