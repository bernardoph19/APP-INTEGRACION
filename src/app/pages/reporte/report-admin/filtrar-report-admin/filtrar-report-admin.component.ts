import { Component, OnInit, Inject } from '@angular/core';

import { MostrarComprobantesPage } from '../mostrar-comprobantes/mostrar-comprobantes.page';

import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-filtrar-report-admin',
  templateUrl: './filtrar-report-admin.component.html',
  styleUrls: ['./filtrar-report-admin.component.scss'],
})
export class FiltrarReportAdminComponent implements OnInit {
  
  itemsFiltros         : any[];

  filtro               : any     = {};
  allComplete          : boolean = false;
  
  activo               : boolean = true; 
  anulado              : boolean = true; 
  enviado              : boolean = true; 
  noenviado            : boolean = true;   

  constructor(
    @Inject( MAT_DIALOG_DATA ) public data : any,   
    public  dialogRef                      : MatDialogRef<MostrarComprobantesPage>,
    private spinner                        : NgxSpinnerService

  ) {
    dialogRef.disableClose = true;
    this.filtro            = data;
  }

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'warn',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent',  completed: false, color: 'accent'},
      {name: 'Warn',    completed: false, color: 'warn'}
    ]
  };
  
  ngOnInit() {}


  aplicarFlitros() {
    this.spinner.show();
    this.dialogRef.close(this.filtro);

  }

  restablecer() {    
    this.filtro.activo = true;
    this.filtro.anulado = true;
    this.filtro.enviado = true;
    this.filtro.noenviado = true;

  }

  Marcado(texto:string) {

    if(texto=='activo') {
      if(this.filtro.activo == false ) {
        this.filtro.anulado = true;

      }

    } if(texto=='anulado') {
      if(this.filtro.anulado == false ) {
        this.filtro.activo = true;

      }

    } if(texto=='enviado') {
      if(this.filtro.enviado == false ) {
        this.filtro.noenviado = true;

      }

    } if(texto=='noenviado') {
      if(this.filtro.noenviado == false ) {
        this.filtro.enviado = true;

      }
    }
  }

  
}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


