import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-configuraciones',
  templateUrl: './menu-configuraciones.page.html',
  styleUrls: ['./menu-configuraciones.page.scss'],
})
export class MenuConfiguracionesPage implements OnInit {

  constructor(    
    private router              : Router,
    private auth                : AuthService,
    private alert               : AlertController, 

  ) { }

  ngOnInit() {
  }

  menuconfi = [

    {
      title: 'Mi Cuenta',
      url: 'micuenta',
      icon: 'newspaper-outline',
      disables: false,
      func: () => {
        this.router.navigate(['/menu-configuraciones/micuenta']);
      }
    },
    {
      title: 'Usuarios',
      url: 'usuarios',
      icon: 'people-outline',
      disables: true,
      func: () => {
        this.router.navigate(['/menu-configuraciones/usuarios']);
      }
    },

  
    {
      title: 'Conexiones',
      url: 'conexion',
      icon: 'repeat-outline',
      disables: true,
      func: () => {
        this.router.navigate(['/menu-configuraciones/conexion']);
      }
    },
   
    {
      title: 'Facturación SUNAT',
      url: '/menu-configuraciones/facturacion-sunat',
      icon: 'document-text-outline',
      disables: true,
      func: () => {
        this.router.navigate(['/menu-configuraciones/facturacion-sunat']);
      }
    },

    {
      title: 'Cerrar Sesión',
      url: '/login',
      icon: 'power-outline',
      disables: false,
      func: () => {
        this.cerrarSesion();
      }
    },
    
  ];

  
  async cerrarSesion(){


    const alert = await this.alert.create({
      cssClass : 'alert',
      header   : 'Pensá',
      message  : '¿Estas seguro que cerrar sesion?',
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
