import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcesoMigracionPage } from './proceso-migracion.page';

const routes: Routes = [
  {
    path: '',
    component: ProcesoMigracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesoMigracionPageRoutingModule {}
