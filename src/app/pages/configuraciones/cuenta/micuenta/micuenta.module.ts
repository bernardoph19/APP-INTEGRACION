import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MicuentaPageRoutingModule } from './micuenta-routing.module';
import { MicuentaPage } from './micuenta.page';
import { CambiarContrasenaPageModule } from '../cambiar-contrasena/cambiar-contrasena.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MicuentaPageRoutingModule,
  
    CambiarContrasenaPageModule
  ],
  declarations: [MicuentaPage]
})
export class MicuentaPageModule {}
