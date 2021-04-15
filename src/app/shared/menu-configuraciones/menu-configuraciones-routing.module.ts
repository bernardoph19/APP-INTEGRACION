import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuConfiguracionesPage } from './menu-configuraciones.page';

const routes: Routes = [

 

//   { path: '',
//   redirectTo: 'menu-configuraciones/micuenta',
//   pathMatch: 'full'
// },

{ path: '',  component: MenuConfiguracionesPage },
{ path:  'micuenta' ,  loadChildren: () => import('../../pages/configuraciones/cuenta/micuenta/micuenta.module').then( m => m.MicuentaPageModule) },
{ path:  'usuarios' ,  loadChildren: () => import('../../pages/configuraciones/usuarios/usuarios.module').then( m => m.UsuariosPageModule)},   
{ path: 'conexion',    loadChildren: () => import('../../pages/configuraciones/conexion/conexion.module').then( m => m.ConexionPageModule)},

];

 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuConfiguracionesPageRoutingModule {}
