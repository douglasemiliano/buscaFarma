import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ModalAlertaComponent } from './modal-alerta/modal-alerta.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModalSucessoComponent } from './modal-sucesso/modal-sucesso.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ModalAlertaComponent,
    ModalSucessoComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ], 
  exports: [
    LoadingComponent,
    ModalAlertaComponent
  ]
})
export class SharedModule { }
