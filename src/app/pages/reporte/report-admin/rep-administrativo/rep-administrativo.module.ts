import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepAdministrativoPageRoutingModule } from './rep-administrativo-routing.module';

import { RepAdministrativoPage } from './rep-administrativo.page';
import { DemoMaterialModule } from '../../../../module.material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoMaterialModule,
    RepAdministrativoPageRoutingModule
  ],
  declarations: [RepAdministrativoPage]
})
export class RepAdministrativoPageModule {}
