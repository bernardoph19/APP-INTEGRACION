import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoClientePageRoutingModule } from './listado-cliente-routing.module';

import { ListadoClientePage } from './listado-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoClientePageRoutingModule
  ],
  declarations: [ListadoClientePage]
})
export class ListadoClientePageModule {}
