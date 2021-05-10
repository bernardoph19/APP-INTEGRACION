import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule  } from '@angular/forms';

import { LoginPage } from './login.page';
import { LoginPageRoutingModule } from './login-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule     
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
