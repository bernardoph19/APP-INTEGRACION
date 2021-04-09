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
<<<<<<< HEAD
=======

>>>>>>> 576a957b036c04108c2e87cefe11ee0f57a44de9

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    DemoMaterialModule,
    SharedModule    
  ],
  providers: [
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
=======
     DemoMaterialModule,
    SharedModule,
  ],
  providers: [
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
>>>>>>> 576a957b036c04108c2e87cefe11ee0f57a44de9
  bootstrap: [AppComponent],
})
export class AppModule {}
