import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TesteComponent } from '../components/teste/teste.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ModalAlertaComponent } from '../shared/modal-alerta/modal-alerta.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private dialogRef: MatDialogRef<LoadingComponent>;
  private dialogRefAlerta: MatDialogRef<ModalAlertaComponent>;
  private dialogRefMapa: MatDialogRef<TesteComponent>;

  constructor(public dialog: MatDialog) { }

  openDialog(dados: any): void {
    this.dialogRefMapa = this.dialog.open(TesteComponent, {
      disableClose: true,
      data: {
        dados: dados
      }
    });
  }

  closeMapa(){
    this.dialogRefMapa.close();
  }

  openLoading() {
    this.dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
  }

  close(){
    this.dialogRef.close();
  }

  modalAlerta(texto: string) {
    this.dialogRefAlerta = this.dialog.open(ModalAlertaComponent, {
      data: {
        texto: texto
      }
    });
  }
}