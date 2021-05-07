import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './module.material';
import { SharedModule } from './shared/shared.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IonicStorageModule } from '@ionic/storage-angular';

import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import {  registerLocaleData } from '@angular/common';
import LocaleEsPe from '@angular/common/locales/es-PE.js';
import { MAT_DATE_LOCALE } from '@angular/material/core';
registerLocaleData(LocaleEsPe);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    SharedModule,  
    NgxSpinnerModule
  ],
  providers: [
    StatusBar,        
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },    
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: LOCALE_ID,  useValue: 'es-PE' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'PEN'},
    File,
    FileOpener,
    OneSignal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
