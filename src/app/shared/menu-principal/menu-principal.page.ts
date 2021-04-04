import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {


  pages = [

    {
      title: 'Main',
      url: '/menu-principal/migrador',
      icon: 'home',
    },

    {
      title: 'Documentos',
      icon: 'newspaper-outline',
       children:[
         {
           title: 'Migrador',
           url: '/menu-principal/migrador',
           icon: 'logo-ionic',
         },
       ]
    },

     {
       title: 'Reportes',
       icon: 'bar-chart-outline',
        children:[
          {
            title: 'Rep. Administrativo',
            url: '/menu/ionic',
            icon: 'logo-ionic',
          },

          {
            title: 'Rep. Contable',
            url: '/menu/flutter',
            icon: 'logo-ionic',
          },
        ]
     }

  ];
  constructor() { }

  ngOnInit() {
  }

}
