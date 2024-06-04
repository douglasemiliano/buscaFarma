import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent {

  public nomeFarmacia: string = ""; 
  public enderecoFarmacia: any;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<TesteComponent>) {
    console.log(data);
    this.nomeFarmacia = data.dados.nome;
    this.enderecoFarmacia = data.dados.endereco
  }

  fechar(event: MouseEvent){
    this._bottomSheetRef.dismiss();
    event.preventDefault()
  }
}
