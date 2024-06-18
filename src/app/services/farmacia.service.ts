import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Farmacia } from '../models/farmacia';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {

  // private url: string = "http://localhost:8080/farmacias";

  private url: string = "https://buscafarmaapi.onrender.com/farmacias";

  farmacias: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  farmaciaAtual: BehaviorSubject<Farmacia | null> = new BehaviorSubject<Farmacia | null>(null);

  localizacaoUsuario: BehaviorSubject<number[]> = new BehaviorSubject<number[]> ([]);

  localizacao: number[];
  constructor(private http: HttpClient, private router: Router, private modalService: ModalService) { }
  


  public buscarFarmacia(bairro: string = "", municipio: string = "", UF: string) {
    this.http.get<Farmacia[]>(`${this.url}/busca?bairro=${bairro}&municipio=${municipio}&estado=${UF}`).subscribe({
      next: (farmacias: Farmacia[]) => {
        if(farmacias.length > 0) {
          this.farmacias.next(farmacias);
          this.router.navigateByUrl("/resultado");
        } else {
          this.modalService.modalAlerta("Nenhum dado encontrado!")
        }
      }, error: (error: Error) => {
        alert(error)
      }
    });
  }

  buscarFarmaciaPorUF(UF: string) {
    this.http.get(this.url + "?endereco.estado=" + UF).subscribe(data => {
      this.farmacias.next(data);
    })
  }

  buscarFarmaciaPorMunicipio(UF: string, municipio: string) {
    this.http.get(this.url + "?endereco.estado=" + UF + "&endereco.municipio=" + municipio).subscribe(data => {
      this.farmacias.next(data);
    })
  }

  buscarFarmaciaPorNome(nome: string) {
    this.http.get(environment.API_URL + "?nomeFantasia=" + nome).subscribe(data => {
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

  avaliar(avaliacao: any, id: number) {
    return this.http.patch(this.url + "/" + id, avaliacao);
  }
}