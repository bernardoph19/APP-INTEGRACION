import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MostrarComprobantesPage } from '../mostrar-comprobantes/mostrar-comprobantes.page';

@Component({
  selector: 'app-filtrar-report-admin',
  templateUrl: './filtrar-report-admin.component.html',
  styleUrls: ['./filtrar-report-admin.component.scss'],
})
export class FiltrarReportAdminComponent implements OnInit {

  formFiltros          : FormGroup;
  itemsFiltros         : any[];
  
  activo               : boolean = true; 
  anulado              : boolean = true; 
  enviado              : boolean = true; 
  noenviado            : boolean = true;   

  constructor(
    private fb               : FormBuilder,
    public  dialogRef        : MatDialogRef<MostrarComprobantesPage>,
  ) { 
    this.createForm();
  }

  ngOnInit() {}

  createForm(){
    this.formFiltros = this.fb.group({
      activo    : [ true ,],
      anulado   : [ true ,],
      enviado   : [ true ,],
      noenviado : [ true ,],

    });
  }

  aplicarFlitros() {

    /* this.activo    = this.formFiltros.controls.activo.value
    this.anulado   = this.formFiltros.controls.anulado.value
    this.enviado   = this.formFiltros.controls.enviado.value
    this.noenviado = this.formFiltros.controls.noenviado.value */

    this.itemsFiltros =  [
       (this.activo    == true) ? 'activo'    : '', 
       (this.anulado   == true) ? 'anulado'   : '', 
       (this.enviado   == true) ? 'enviado'   : '', 
       (this.noenviado == true) ? 'noenviado' : ''
    ];

    this.dialogRef.close( this.itemsFiltros );

  }
  
  updateValue(val : boolean, name : string) {

    switch (name) {
      case 'activo':
        this.activo = val;        
        break;

      case 'anulado':
        this.anulado = val;
        break;

      case 'enviado':
        this.enviado = val;        
        break;

      case 'noenviado':
        this.noenviado = val;
        break;

    }

  }

  restablecer() {
    this.activo    = true;
    this.anulado   = true;
    this.enviado   = true;
    this.noenviado = true;

  }
}

