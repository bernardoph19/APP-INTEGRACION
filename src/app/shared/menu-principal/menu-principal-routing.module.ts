import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPrincipalPage } from './menu-principal.page';


const routes: Routes = [

  { path: '',
    redirectTo: 'menu-principal/migrador',
    pathMatch: 'full'
},

  {
    path: '',
    component: MenuPrincipalPage,

    children:[
      { path: 'migrador',           loadChildren:  ()  =>  import ('../../pages/Migrar/migrador/migrador.module').then( m => m.MigradorPageModule) },
      { path: 'proceso-migracion',  loadChildren:  ()  =>  import ('../../pages/Migrar/proceso-migracion/proceso-migracion.module').then( m => m.ProcesoMigracionPageModule)},
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPrincipalPageRoutingModule {}
