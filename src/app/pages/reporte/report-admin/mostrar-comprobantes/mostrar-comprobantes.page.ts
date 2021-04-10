
import { Component, OnInit } from '@angular/core'; 
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-comprobantes',
  templateUrl: './mostrar-comprobantes.page.html',
  styleUrls: ['./mostrar-comprobantes.page.scss'],
})
export class MostrarComprobantesPage implements OnInit {

  app_bar: boolean;

  constructor(public compartir: ActionSheetController ) {}

 
  async descargar() {
    const actionSheet = await this.compartir.create({
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

  onClick(){    
  }

}

