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

  latitude: number;
  longitude: number;

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
  estado: FormControl = new FormControl("Selecione o Estado", [Validators.required])
  municipio: FormControl = new FormControl("", [Validators.required])



  constructor(private farmaciaService: FarmaciaService) {
    this.getCurrentLocation();
  }

  onSubmit() {
    switch (this.tipoBusca) {
      case "estado":
        this.farmaciaService.buscarFarmacia("", "", this.estado.value.toUpperCase());
        break
      case "municipio":
        this.farmaciaService.buscarFarmacia("", this.normalizarString(this.pesquisa.value), this.estado.value.toUpperCase());
        break
      case "farmacia":
        this.farmaciaService.buscarFarmacia("", "", this.normalizarString(this.pesquisa.value))
        break
        case "bairro":
          this.farmaciaService.buscarFarmacia(this.normalizarString(this.pesquisa.value), this.municipio.value, this.estado.value)
          break
    }
  }

  normalizarString(string: string): string {
    return string.toUpperCase().normalize('NFD').replace(/\p{Mn}/gu, "")
  }

  pesquisarPorProximidade(){
    if(this.latitude && this.longitude){{
      this.farmaciaService.buscarFarmaciasMaisProximas("-8.169507", "-34.928179")
    }} else {
      this.tipoBusca = "proximidade";
    }
  }

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
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
