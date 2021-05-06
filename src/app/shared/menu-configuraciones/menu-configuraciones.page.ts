import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-configuraciones',
  templateUrl: './menu-configuraciones.page.html',
  styleUrls: ['./menu-configuraciones.page.scss'],
})
export class MenuConfiguracionesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuconfi = [

    {
      title: 'Mi Cuenta',
      url: 'micuenta',
      icon: 'newspaper-outline',
      disables: false
    },

  
    {
      title: 'Usuarios',
      url: 'usuarios',
      icon: 'people-outline',
      disables: true
    },

  
    {
      title: 'Conexiones',
      url: 'conexion',
      icon: 'repeat-outline',
      disables: true
    },
   
    {
      title: 'Facturación SUNAT',
      url: '/menu-configuraciones/facturacion-sunat',
      icon: 'document-text-outline',
      disables: true
    },

    {
      title: 'Cerrar Sesión',
      url: '/login',
      icon: 'power-outline',
      disables: false
    },
    
  ];
}
