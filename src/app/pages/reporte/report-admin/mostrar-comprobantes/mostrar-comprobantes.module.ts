import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarComprobantesPageRoutingModule } from './mostrar-comprobantes-routing.module';

import { MostrarComprobantesPage } from './mostrar-comprobantes.page';
 import { DemoMaterialModule } from '../../../../module.material';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarComprobantesPageRoutingModule,
    DemoMaterialModule,
    ComponentsModule 
  ],
  
  declarations: [MostrarComprobantesPage]
})
export class MostrarComprobantesPageModule {}
