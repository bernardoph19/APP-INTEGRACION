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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    SharedModule,  
  ],
  providers: [
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
