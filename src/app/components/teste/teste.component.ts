import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent {

  public nomeFarmacia: string = ""; 
  public enderecoFarmacia: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.nomeFarmacia = data.dados.nome;
    this.enderecoFarmacia = data.dados.endereco
    
  }
}
