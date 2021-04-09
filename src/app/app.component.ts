import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private platform: Platform,
    private statusBar: StatusBar,
<<<<<<< HEAD
    private router: Router
  ) {
=======
    private router: Router,
  ) 

  {
>>>>>>> 576a957b036c04108c2e87cefe11ee0f57a44de9
    this.iniciarApp();
  }


  iniciarApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.router.navigateByUrl('splash');
    });
  }

}
