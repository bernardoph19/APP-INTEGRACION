import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-proceso-migracion',
  templateUrl: './proceso-migracion.page.html',
  styleUrls: ['./proceso-migracion.page.scss'],
})
export class ProcesoMigracionPage implements OnInit {

  @Input() titulo: string;

  constructor() { }

  ngOnInit() {
  }

}
