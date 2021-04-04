import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcesoMigracionPageRoutingModule } from './proceso-migracion-routing.module';

import { ProcesoMigracionPage } from './proceso-migracion.page';
import { DemoMaterialModule } from '../../../module.material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcesoMigracionPageRoutingModule,
    DemoMaterialModule
  ],
  declarations: [ProcesoMigracionPage]
})
export class ProcesoMigracionPageModule {}
