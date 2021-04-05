import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturacionSunatPageRoutingModule } from './facturacion-sunat-routing.module';

import { FacturacionSunatPage } from './facturacion-sunat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturacionSunatPageRoutingModule
  ],
  declarations: [FacturacionSunatPage]
})
export class FacturacionSunatPageModule {}
