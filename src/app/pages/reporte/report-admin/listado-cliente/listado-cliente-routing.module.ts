import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoClientePage } from './listado-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoClientePageRoutingModule {}
