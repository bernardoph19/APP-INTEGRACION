import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    LoadingComponent
  ],
  exports:[
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ]
})
export class ComponentsModule { }
