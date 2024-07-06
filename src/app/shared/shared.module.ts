import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ModalAlertaComponent } from './modal-alerta/modal-alerta.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModalSucessoComponent } from './modal-sucesso/modal-sucesso.component';
import { FabButtonComponent } from './fab-button/fab-button.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ModalAlertaComponent,
    ModalSucessoComponent,
    FabButtonComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ], 
  exports: [
    LoadingComponent,
    ModalAlertaComponent,
    FabButtonComponent
  ]
})
export class SharedModule { }
