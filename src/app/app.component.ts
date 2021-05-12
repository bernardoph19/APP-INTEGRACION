import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import {registerWebPlugin} from "@capacitor/core";
import {FileSharer} from '@byteowls/capacitor-filesharer';
import { PushService } from './services/push.service';
import { AuthService } from './services/auth.service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private statusBar : StatusBar,
    private router    : Router,
    private pushService : PushService,
    private auth : AuthService

  ) {
    this.iniciarApp();
  }

  
  iniciarApp() {
    this.platform.ready().then(async () => {
      //this.statusBar.styleDefault();
      //this.router.navigateByUrl('/menu-principal/migrador');
      registerWebPlugin(FileSharer);
      this.pushService.configuracionInicial();
      await this.auth.ValidarToken();
      
    });
  }

}
