import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuConfiguracionesPage } from './menu-configuraciones.page';

const routes: Routes = [

  { path: '',
    redirectTo: 'menu-configuraciones/micuenta',
    pathMatch: 'full'
  },

  {
    path: '',
    component: MenuConfiguracionesPage,

    children:[
      { path: 'micuenta',          loadChildren: () => import('../../pages/configuraciones/cuenta/micuenta/micuenta.module').then( m => m.MicuentaPageModule) },
      { path: 'usuarios',          loadChildren: () => import('../../pages/configuraciones/usuarios/usuarios.module').then( m => m.UsuariosPageModule) },
      { path: 'conexiones',        loadChildren: () => import('../../pages/configuraciones/conexiones/conexiones.module').then( m => m.ConexionesPageModule) },
      { path: 'facturacion-sunat', loadChildren: () => import('../../pages/configuraciones/facturacion-sunat/facturacion-sunat.module').then( m => m.FacturacionSunatPageModule) },
      ],    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuConfiguracionesPageRoutingModule {}
