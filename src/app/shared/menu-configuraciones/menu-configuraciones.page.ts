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
      url: '/micuenta',
      icon: 'newspaper-outline',
    },
  
    {
      title: 'Usuarios',
      url: '/menu-configuraciones/usuarios',
      icon: 'people-outline',
    },
  
    {
      title: 'Conexiones',
      url: '/menu-configuraciones/conexiones',
      icon: 'repeat-outline',
    },
   
    {
      title: 'Facturación SUNAT',
      url: '/menu-configuraciones/facturacion-sunat',
      icon: 'document-text-outline',
    },

    {
      title: 'Cerrar Sesión',
      url: '/login',
      icon: 'power-outline',
    },
    
  ];
}
