import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepAdministrativoPageRoutingModule } from './rep-administrativo-routing.module';

import { RepAdministrativoPage } from './rep-administrativo.page';
 import { DemoMaterialModule } from '../../../../module.material';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
     DemoMaterialModule,
    RepAdministrativoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RepAdministrativoPage]
})
export class RepAdministrativoPageModule {}
