import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarComprobantesPage } from './mostrar-comprobantes.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarComprobantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarComprobantesPageRoutingModule {}
