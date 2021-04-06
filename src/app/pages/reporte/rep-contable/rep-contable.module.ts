import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepContablePageRoutingModule } from './rep-contable-routing.module';

import { RepContablePage } from './rep-contable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepContablePageRoutingModule
  ],
  declarations: [RepContablePage]
})
export class RepContablePageModule {}
