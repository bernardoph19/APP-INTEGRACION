import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './guards/auth-login.guard';

const routes: Routes = [

   {
     path: '',
     redirectTo: '/login',
     pathMatch: 'full'
   },

  { path:  'login',                loadChildren: () => import  ('./auth/login/login.module')                                 .then( m => m.LoginPageModule) , canLoad: [AuthLoginGuard]    },
  { path:  'inicio',               loadChildren: () => import  ('./pages/inicio/inicio.module')                              .then( m => m.InicioPageModule)    },
  { path:  'menu-principal',       loadChildren: () => import  ('./shared/menu-principal/menu-principal.module')             .then( m => m.MenuPrincipalPageModule) },
  { path:  'menu-configuraciones', loadChildren: () => import  ('./shared/menu-configuraciones/menu-configuraciones.module') .then( m => m.MenuConfiguracionesPageModule) },
  { path:  'mostrarcpe',           loadChildren: () => import  ('./pages/reporte/report-admin/mostrar-comprobantes/mostrar-comprobantes.module') .then( m => m.MostrarComprobantesPageModule) },
  { path:  'menu-configuraciones', loadChildren: () => import  ('./shared/menu-configuraciones/menu-configuraciones.module') .then( m => m.MenuConfiguracionesPageModule) },
  // { path: 'micuenta',              loadChildren: () => import('./pages/configuraciones/cuenta/micuenta/micuenta.module').then( m => m.MicuentaPageModule) },
  { path: 'listado-cliente',       loadChildren: () => import('./pages/reporte/report-admin/listado-cliente/listado-cliente.module').then( m => m.ListadoClientePageModule) },
  { path: 'splash',                loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule) },
 

   
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
