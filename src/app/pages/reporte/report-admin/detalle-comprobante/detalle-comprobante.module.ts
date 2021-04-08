import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleComprobantePageRoutingModule } from './detalle-comprobante-routing.module';

import { DetalleComprobantePage } from './detalle-comprobante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleComprobantePageRoutingModule
  ],
  declarations: [DetalleComprobantePage]
})
export class DetalleComprobantePageModule {}
