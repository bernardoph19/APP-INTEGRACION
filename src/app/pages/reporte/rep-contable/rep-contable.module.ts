import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';

import { RepContablePageRoutingModule } from './rep-contable-routing.module';

import { RepContablePage } from './rep-contable.page';
import { DemoMaterialModule } from 'src/app/module.material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    RepContablePageRoutingModule,
    DemoMaterialModule
  ],
  declarations: [RepContablePage]
})
export class RepContablePageModule {}
