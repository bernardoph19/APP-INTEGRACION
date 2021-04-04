import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-migrador',
  templateUrl: './migrador.page.html',
  styleUrls: ['./migrador.page.scss'],
})
export class MigradorPage implements OnInit {

  constructor( private navCtrl: NavController) { }

  ngOnInit( ) {
  }


  Ver(){
    this.navCtrl.navigateRoot ('/menu-principal/proceso-migracion');
  }

}
