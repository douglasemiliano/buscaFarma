import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TesteComponent } from '../components/teste/teste.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  openDialog(dados: any): void {
    this.dialog.open(TesteComponent, {
      data: {
        dados: dados
      }
    });
  }
}