import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MicuentaPageRoutingModule } from './micuenta-routing.module';
import { MicuentaPage } from './micuenta.page';
import { CambiarContrasenaPageModule } from '../cambiar-contrasena/cambiar-contrasena.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    MicuentaPageRoutingModule,
    ComponentsModule,
    FormsModule,
    CambiarContrasenaPageModule
  ],
  declarations: [MicuentaPage]
})
export class MicuentaPageModule {}
