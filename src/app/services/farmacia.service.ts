import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {

  private url: string = "http://localhost:3000/farmacias?";

  farmacias: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  buscarFarmaciaPorUF(UF: string) {
    this.http.get(this.url + "endereco.estado=" + UF).subscribe(data => {
      console.log(data);
      this.farmacias.next(data);
    })
  }

}
