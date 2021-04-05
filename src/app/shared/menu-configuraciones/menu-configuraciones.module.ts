import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuConfiguracionesPageRoutingModule } from './menu-configuraciones-routing.module';

import { MenuConfiguracionesPage } from './menu-configuraciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuConfiguracionesPageRoutingModule
  ],
  declarations: [MenuConfiguracionesPage]
})
export class MenuConfiguracionesPageModule {}
