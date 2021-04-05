import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorMigracionPageRoutingModule } from './error-migracion-routing.module';

import { ErrorMigracionPage } from './error-migracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorMigracionPageRoutingModule
  ],
  declarations: [ErrorMigracionPage]
})
export class ErrorMigracionPageModule {}
