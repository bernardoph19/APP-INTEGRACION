import { NgModule } from '@angular/core';
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
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IonicStorageModule } from '@ionic/storage-angular';

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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
