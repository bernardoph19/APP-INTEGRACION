import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MigradorPage } from './migrador.page';

const routes: Routes = [
  {
    path: '',
    component: MigradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigradorPageRoutingModule {}
