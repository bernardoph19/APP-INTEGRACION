import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepContablePage } from './rep-contable.page';

const routes: Routes = [
  {
    path: '',
    component: RepContablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepContablePageRoutingModule {}
