import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        ]
     }
     
  ];

  constructor(
    private auth               : AuthService,
    private router             : Router,  
    
  ) {

   }

  async ngOnInit() { 
    this.usuario =  await this.auth.obtenerDatosStorage();
    this.bs64logo = true;
  }

  cerraSession() {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl : true});

  }

}
