import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estado } from 'src/app/models/estado';
import { FarmaciaService } from 'src/app/services/farmacia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  step: number = 1;
  tipoBusca: string = "estado";

  estados: Estado[] = [
    { estado: "Acre", uf: "AC" },
    { estado: "Alagoas", uf: "AL" },
    { estado: "Amapá", uf: "AP" },
    { estado: "Amazonas", uf: "AM" },
    { estado: "Bahia", uf: "BA" },
    { estado: "Ceará", uf: "CE" },
    { estado: "Distrito Federal", uf: "DF" },
    { estado: "Espírito Santo", uf: "ES" },
    { estado: "Goiás", uf: "GO" },
    { estado: "Maranhão", uf: "MA" },
    { estado: "Mato Grosso", uf: "MT" },
    { estado: "Mato Grosso do Sul", uf: "MS" },
    { estado: "Minas Gerais", uf: "MG" },
    { estado: "Pará", uf: "PA" },
    { estado: "Paraíba", uf: "PB" },
    { estado: "Paraná", uf: "PR" },
    { estado: "Pernambuco", uf: "PE" },
    { estado: "Piauí", uf: "PI" },
    { estado: "Rio de Janeiro", uf: "RJ" },
    { estado: "Rio Grande do Norte", uf: "RN" },
    { estado: "Rio Grande do Sul", uf: "RS" },
    { estado: "Rondônia", uf: "RO" },
    { estado: "Roraima", uf: "RR" },
    { estado: "Santa Catarina", uf: "SC" },
    { estado: "São Paulo", uf: "SP" },
    { estado: "Sergipe", uf: "SE" },
    { estado: "Tocantins", uf: "TO" }
  ];

  pesquisa: FormControl = new FormControl("", [Validators.required])
  estado: FormControl = new FormControl("PE", [Validators.required])


  constructor(private farmaciaService: FarmaciaService) {
    this.getCurrentLocation();
  }

  onSubmit() {
    switch (this.tipoBusca) {
      case "estado":
        this.farmaciaService.buscarFarmacia("", "", this.estado.value.toUpperCase());
        break
      case "municipio":
        this.farmaciaService.buscarFarmacia("", this.pesquisa.value.toUpperCase().normalize('NFD').replace(/\p{Mn}/gu), this.estado.value.toUpperCase());
        break
      case "farmacia":
        this.farmaciaService.buscarFarmacia("", "", this.pesquisa.value.toUpperCase().normalize('NFD').replace(/\p{Mn}/gu, ""))
        break


    }
  }

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.farmaciaService.setLocalizacaoUsuario([position.coords.latitude, position.coords.longitude])
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  public selecionarTipoBusca(tipoBusca: string) {
    this.tipoBusca = tipoBusca;
    this.step = this.step + 1;
  }

  public voltarStep() {
    this.step = this.step - 1;
  }
}
