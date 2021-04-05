import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorMigracionPage } from './error-migracion.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorMigracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorMigracionPageRoutingModule {}
