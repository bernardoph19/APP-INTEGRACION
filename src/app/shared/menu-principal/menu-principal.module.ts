import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPrincipalPageRoutingModule } from './menu-principal-routing.module';
import { MenuPrincipalPage } from './menu-principal.page';
import { DemoMaterialModule } from 'src/app/module.material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPrincipalPageRoutingModule,
    DemoMaterialModule
  ],
  declarations: [MenuPrincipalPage]
})
export class MenuPrincipalPageModule {}
