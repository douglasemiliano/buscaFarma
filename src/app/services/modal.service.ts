import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TesteComponent } from '../components/teste/teste.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog, private bottomSheet: MatBottomSheet) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, dados: any): void {
    this.bottomSheet.open(TesteComponent, {
      data: {
        dados: dados
      }
    });
  }
}
