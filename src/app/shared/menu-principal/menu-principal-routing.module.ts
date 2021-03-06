import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPrincipalPage } from './menu-principal.page';


const routes: Routes = [

  { path: '',
    redirectTo: 'menu-principal/rep-administrativo',
    pathMatch: 'full'
},

  {
    path: '',
    component: MenuPrincipalPage,

    children:[

      { path: 'migrador',             loadChildren:  ()  =>  import ('../../pages/Migrar/migrador/migrador.module').then( m => m.MigradorPageModule) },
      { path: 'proceso-migracion',    loadChildren:  ()  =>  import ('../../pages/Migrar/proceso-migracion/proceso-migracion.module').then( m => m.ProcesoMigracionPageModule)},
      { path: 'error-migracion',      loadChildren:  ()  =>  import ('../../pages/migrar/error-migracion/error-migracion.module').then( m => m.ErrorMigracionPageModule) },
      { path: 'rep-administrativo',   loadChildren:  ()  =>  import ('../../pages/reporte/report-admin/rep-administrativo/rep-administrativo.module').then( m => m.RepAdministrativoPageModule) },
      { path: 'rep-contable',         loadChildren:  ()  =>  import ('../../pages/reporte/rep-contable/rep-contable.module').then( m => m.RepContablePageModule) },
      { path: 'mostrar-comprobantes', loadChildren:  ()  =>  import ('../../pages/reporte/report-admin/mostrar-comprobantes/mostrar-comprobantes.module').then( m => m.MostrarComprobantesPageModule)},
      { path: 'detalle-comprobante',  loadChildren:   () =>  import('../../pages/reporte/report-admin/detalle-comprobante/detalle-comprobante.module').then( m => m.DetalleComprobantePageModule)},  
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPrincipalPageRoutingModule {}
