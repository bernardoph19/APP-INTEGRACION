import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepAdministrativoPage } from './rep-administrativo.page';

const routes: Routes = [
  {
    path: '',
    component: RepAdministrativoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepAdministrativoPageRoutingModule {}
