import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Farmacia } from '../models/farmacia';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {

  private url: string = "http://localhost:3000/farmacias?";

  farmacias: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  farmaciaAtual: BehaviorSubject<Farmacia | null> = new BehaviorSubject<Farmacia | null>(null);

  localizacaoUsuario: BehaviorSubject<number[]> = new BehaviorSubject<number[]> ([]);

  localizacao: number[];
  constructor(private http: HttpClient) { }

  buscarFarmaciaPorUF(UF: string) {
    this.http.get(this.url + "endereco.estado=" + UF).subscribe(data => {
      this.farmacias.next(data);
    })
  }

  buscarFarmaciaPorMunicipio(UF: string, municipio: string) {
    this.http.get(this.url + "endereco.estado=" + UF + "&endereco.municipio=" + municipio).subscribe(data => {
      this.farmacias.next(data);
    })
  }

  buscarFarmaciaPorNome(nome: string) {
    this.http.get(this.url + "nomeFantasia=" + nome).subscribe(data => {
      this.farmacias.next(data);
    })
  }

  setFarmaciaAtual(farmacia: Farmacia) {
    this.farmaciaAtual.next(farmacia);
  }

  setLocalizacaoUsuario(localizacao: number[]){
    this.localizacao = localizacao.sort();
    this.localizacaoUsuario.next(localizacao);
  }

}
