import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MicuentaPageRoutingModule } from './micuenta-routing.module';
import { MicuentaPage } from './micuenta.page';
import { EditarcorreoPageModule } from '../editarcorreo/editarcorreo.module';
import { EditarNombrePageModule } from '../editar-nombre/editar-nombre.module';
import { EditarnumeroPageModule } from '../editarnumero/editarnumero.module';
import { CambiarContrasenaPageModule } from '../cambiar-contrasena/cambiar-contrasena.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MicuentaPageRoutingModule,
    EditarcorreoPageModule,
    EditarNombrePageModule,
    EditarnumeroPageModule,
    CambiarContrasenaPageModule
  ],
  declarations: [MicuentaPage]
})
export class MicuentaPageModule {}
