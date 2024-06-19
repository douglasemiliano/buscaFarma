import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent {

  public nomeFarmacia: string = ""; 
  public enderecoFarmacia: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private modalService: ModalService) {
    console.log(data);
    this.nomeFarmacia = data.dados.nome;
    this.enderecoFarmacia = data.dados.endereco
    
  }

  close(){
    this.modalService.closeMapa();
  }
}
