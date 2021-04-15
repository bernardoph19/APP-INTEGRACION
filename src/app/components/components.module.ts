import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FiltrarReportAdminComponent } from '../pages/reporte/report-admin/filtrar-report-admin/filtrar-report-admin.component';
import { DemoMaterialModule } from '../module.material';



@NgModule({
  declarations: [
    LoadingComponent,
    FiltrarReportAdminComponent
  ],
  exports:[
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    DemoMaterialModule
  ]
})
export class ComponentsModule { }
