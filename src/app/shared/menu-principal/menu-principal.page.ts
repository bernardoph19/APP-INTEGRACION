import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service.service';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  open      : boolean;
  usuario   : any
  bs64logo  : boolean = false;
  user      : string;
  


  pages = [

    // {
    //   title: 'Documentos',
    //   icon: 'newspaper-outline',
    //    children:[
    //      {
    //        title: 'Migrador',
    //        url: '/menu-principal/migrador',
    //        icon: 'logo-ionic',
    //      },
    //    ]
    // },

     {  title: 'Reportes',
        icon: 'bar-chart-outline',
        children:[
          {
            title: 'Rep. Administrativo',
            url: '/menu-principal/rep-administrativo',
            icon: 'logo-ionic',
          },

          {
            title: 'Rep. Contable',
            url: '/menu-principal/rep-contable',
            icon: 'logo-ionic',
          },
        ],
        
     }
     
  ];

  constructor(
    private auth               : AuthService,
    private router             : Router,  
    private alert              : AlertController, 
  ) {

   }

  async ngOnInit() { 
    this.usuario =  await this.auth.obtenerDatosStorage();
    this.bs64logo = true;
  }

  async cerraSession() {

    const alert = await this.alert.create({
      cssClass : 'alert',
      header   : 'FC Integracion advertencia',
      message  : '¿Estas seguro de cerrar sesion?',
      buttons  : [
        {
          text    : 'NO',
          handler : () => {

          }

        },
        {
          text    : 'OK',
          handler : () => {
            this.auth.logout();
            this.router.navigate(['/login'], { replaceUrl: true })            

          }
        }        
      ] 
    });
 
    alert.present(); 

  }

  

}
