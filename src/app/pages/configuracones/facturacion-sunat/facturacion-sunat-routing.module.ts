import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturacionSunatPage } from './facturacion-sunat.page';

const routes: Routes = [
  {
    path: '',
    component: FacturacionSunatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturacionSunatPageRoutingModule {}
