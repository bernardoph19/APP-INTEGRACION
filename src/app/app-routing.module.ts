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
  { path: 'micuenta',          loadChildren: () => import('./pages/configuracones/micuenta/micuenta.module').then( m => m.MicuentaPageModule) },
     

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
