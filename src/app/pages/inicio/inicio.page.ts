import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

slides: {img: string, titulo: string} [] = [

  {
    img: 'assets/img/bienvenido.svg',
    titulo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur neque, ipsam distinctio inventore magni at quae quisquam qui dignissimos magnam eos? Nisi tempore recusandae deserunt reiciendis incidunt exercitationem odio culpa.'
  },

  {
    img: 'assets/img/estadist.svg ',
    titulo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur neque, ipsam distinctio inventore magni at quae quisquam qui dignissimos magnam eos? Nisi tempore recusandae deserunt reiciendis incidunt exercitationem odio culpa.'
  },

  {
    img: 'assets/img/repor.svg',
    titulo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur neque, ipsam distinctio inventore magni at quae quisquam qui dignissimos magnam eos? Nisi tempore recusandae deserunt reiciendis incidunt exercitationem odio culpa.'
  },
];


  constructor( private navCtrl:NavController) { }
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  ngOnInit() {
  }

  omitir(){
    this.navCtrl.navigateRoot ('/menu-principal/migrador');
  }

}
