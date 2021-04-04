import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MigradorPageRoutingModule } from './migrador-routing.module';

import { MigradorPage } from './migrador.page';
import { DemoMaterialModule } from '../../../module.material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MigradorPageRoutingModule,
    DemoMaterialModule
  ],
  declarations: [MigradorPage]
})
export class MigradorPageModule {}
