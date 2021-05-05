import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import {registerWebPlugin} from "@capacitor/core";
import {FileSharer} from '@byteowls/capacitor-filesharer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.iniciarApp();
  }

  
  iniciarApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.router.navigateByUrl('/menu-principal/migrador');
      registerWebPlugin(FileSharer);
    });
  }

}
