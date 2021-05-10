import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CambiarContrasenaPage } from './cambiar-contrasena.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [CambiarContrasenaPage]
})
export class CambiarContrasenaPageModule {}
