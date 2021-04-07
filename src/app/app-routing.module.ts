import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path:  'login',                loadChildren: () => import  ('./auth/login/login.module')                                 .then( m => m.LoginPageModule)     },
  { path:  'inicio',               loadChildren: () => import  ('./pages/inicio/inicio.module')                              .then( m => m.InicioPageModule)    },
  { path:  'menu-principal',       loadChildren: () => import  ('./shared/menu-principal/menu-principal.module')             .then( m => m.MenuPrincipalPageModule) },
  { path:  'menu-configuraciones', loadChildren: () => import  ('./shared/menu-configuraciones/menu-configuraciones.module') .then( m => m.MenuConfiguracionesPageModule) },
  { path: 'micuenta',              loadChildren: () => import('./pages/configuraciones/cuenta/micuenta/micuenta.module').then( m => m.MicuentaPageModule) },
  { path: 'editar-nombre',         loadChildren: () => import('./pages/configuraciones/cuenta/editar-nombre/editar-nombre.module').then( m => m.EditarNombrePageModule) },
  { path: 'listado-cliente',       loadChildren: () => import('./pages/reporte/report-admin/listado-cliente/listado-cliente.module').then( m => m.ListadoClientePageModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
