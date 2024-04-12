import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Subscription } from 'rxjs';
import { GeoService } from 'src/app/services/geo.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { Farmacia } from 'src/app/models/farmacia';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements AfterViewInit, OnInit, OnDestroy {

  isControlsOpened = false;
  lat: number = 0;
  long: number = 0;
  farmacias: Farmacia[] = [
    {
      nome: "FARMACIA DO TRABALHADOR DE ACRELANDIA LTDA",
      longLat: [-67.054223379613, -10.07697746718],
      nomeFantasia: "GASTE MENOS",
      endereco: {
        rua: "AVENIDA GERALDO BARBOSA",
        numero: "506",
        bairro: "CENTRO",
        municipio: "ACRELANDIA",
        estado: "AC"
      }
    },
    {
      nome: "EMPREENDIMENTOS PAGUE MENOS S/A",
      longLat: [-72.671232877825, -7.63535608183],
      nomeFantasia: "FARMACIA PAGUE MENOS",
      endereco: {
        rua: "AVENIDA CORONEL MANCIO LIMA",
        numero: "421",
        bairro: "BAIXA",
        municipio: "CRUZEIRO DO SUL",
        estado: "AC"
      }
    },
    {
      nome: "H. R. LIMA",
      longLat: [-72.669931576625, -7.637472807336],
      nomeFantasia: "DROGARIA CRUZEIRO",
      endereco: {
        rua: "AVENIDA CEL. MANCIO LIMA",
        numero: "169",
        bairro: "CENTRO",
        municipio: "CRUZEIRO DO SUL",
        estado: "AC"
      }
    },
    {
      nome: "MARIA DA SILVA FREITAS",
      longLat: [-68.7429138, -11.0273133],
      nomeFantasia: "DROGA ATIVA",
      endereco: {
        rua: "AVENIDA SANTOS DUMONT",
        numero: "646",
        bairro: "CENTRO",
        municipio: "EPITACIOLANDIA",
        estado: "AC"
      }
    },
    {
      nome: "R V N FELICIO",
      longLat: [-70.358556798545, -8.169835653188],
      nomeFantasia: "FARMACENTRO",
      endereco: {
        rua: "AVENIDA MARECHAL DEODORO",
        numero: "780",
        bairro: "CENTRO",
        municipio: "FEIJO",
        estado: "AC"
      }
    },
    {
      nome: "R. LUCAS DA SILVA",
      longLat: [-72.896143883621, -7.620155148104],
      nomeFantasia: "R FARMA",
      endereco: {
        rua: "AVENIDA JAPIIM",
        numero: "1061",
        bairro: "CENTRO",
        municipio: "MANCIO LIMA",
        estado: "AC"
      }
    },
    {
      nome: "R. LUCAS DA SILVA",
      longLat: [-72.785143377806, -8.946616499042],
      nomeFantasia: "R FARMA",
      endereco: {
        rua: "RUA CINCO DE NOVEMBRO",
        numero: "14",
        bairro: "CENTRO",
        municipio: "MARECHAL THAUMATURGO",
        estado: "AC"
      }
    },
    {
      nome: "SERGIO CARLOS VIEIRA",
      longLat: [-67.184933008247, -10.333394301279],
      nomeFantasia: "DROGARIA E COMERCIAL CENTRAL",
      endereco: {
        rua: "AVENIDA EPITACIO PESSOA",
        numero: "476",
        bairro: "CENTRO",
        municipio: "PLACIDO DE CASTRO",
        estado: "AC"
      }
    },
    {
      nome: "J CRUZ LTDA",
      longLat: [-67.805656417181, -9.971701268856],
      nomeFantasia: "FARMACIA DO CONSUMIDOR",
      endereco: {
        rua: "AVENIDA CEARA",
        numero: "952",
        bairro: "CERAMICA",
        municipio: "RIO BRANCO",
        estado: "AC"
      }
    },
    {
      nome: "EMPREENDIMENTOS PAGUE MENOS S/A",
      longLat: [-67.810917928727, -9.962390395795],
      nomeFantasia: "FARMACIA PAGUE NENOS",
      endereco: {
        rua: "RUA QUINTINO BOCAIUVA",
        numero: "1514",
        bairro: "BOSQUE",
        municipio: "RIO BRANCO",
        estado: "AC"
      }
    },
    {
      nome: "EMPREENDIMENTOS PAGUE MENOS S/A",
      longLat: [-67.805622912853, -9.972289591083],
      nomeFantasia: "EMPREENDIMENTOS PAGUE MENOS",
      endereco: {
        rua: "AVENIDA BRASIL",
        numero: "71",
        bairro: "CENTRO",
        municipio: "RIO BRANCO",
        estado: "AC"
      }
    },
    {
      nome: "EMPREENDIMENTOS PAGUE MENOS S/A",
      longLat: [-67.832838404506, -9.965748200804],
      nomeFantasia: "PAGUE MENOS",
      endereco: {
        rua: "AVENIDA NACOES UNIDAS",
        numero: "2890",
        bairro: "ESTACAO EXPERIMENTAL",
        municipio: "RIO BRANCO",
        estado: "AC"
      }
    },
    {
      nome: "FARMACIA DO TRABALHADOR DE ACRELANDIA LTDA",
      longLat: [-67.054223379613, -10.07697746718],
      nomeFantasia: "GASTE MENOS",
      endereco: {
        rua: "AVENIDA GERALDO BARBOSA",
        numero: "506",
        bairro: "CENTRO",
        municipio: "ACRELANDIA",
        estado: "AC"
      }
    },
    {
      nome: "EMPREENDIMENTOS PAGUE MENOS S/A",
      longLat: [-72.671232877825, -7.63535608183],
      nomeFantasia: "FARMACIA PAGUE MENOS",
      endereco: {
        rua: "AVENIDA CORONEL MANCIO LIMA",
        numero: "421",
        bairro: "BAIXA",
        municipio: "CRUZEIRO DO SUL",
        estado: "AC"
      }
    },
    {
      nome: "H. R. LIMA",
      longLat: [-72.669931576625, -7.637472807336],
      nomeFantasia: "DROGARIA CRUZEIRO",
      endereco: {
        rua: "AVENIDA CEL. MANCIO LIMA",
        numero: "169",
        bairro: "CENTRO",
        municipio: "CRUZEIRO DO SUL",
        estado: "AC"
      }
    },
    {
      nome: "MARIA DA SILVA FREITAS",
      longLat: [-68.7429138, -11.0273133],
      nomeFantasia: "DROGA ATIVA",
      endereco: {
        rua: "AVENIDA SANTOS DUMONT",
        numero: "646",
        bairro: "CENTRO",
        municipio: "EPITACIOLANDIA",
        estado: "AC"
      }
    },
    {
      nome: "R V N FELICIO",
      longLat: [-70.358556798545, -8.169835653188],
      nomeFantasia: "FARMACENTRO",
      endereco: {
        rua: "AVENIDA MARECHAL DEODORO",
        numero: "780",
        bairro: "CENTRO",
        municipio: "FEIJO",
        estado: "AC"
      }
    },
    {
      nome: "R. LUCAS DA SILVA",
      longLat: [-72.896143883621, -7.620155148104],
      nomeFantasia: "R FARMA",
      endereco: {
        rua: "AVENIDA JAPIIM",
        numero: "1061",
        bairro: "CENTRO",
        municipio: "MANCIO LIMA",
        estado: "AC"
      }
    },
    {
      nome: "R. LUCAS DA SILVA",
      longLat: [-72.785143377806, -8.946616499042],
      nomeFantasia: "R FARMA",
      endereco: {
        rua: "RUA CINCO DE NOVEMBRO",
        numero: "14",
        bairro: "CENTRO",
        municipio: "MARECHAL THAUMATURGO",
        estado: "AC"
      }
    },
    {
      nome: "SERGIO CARLOS VIEIRA",
      longLat: [-67.184933008247, -10.333394301279],
      nomeFantasia: "DROGARIA E COMERCIAL CENTRAL",
      endereco: {
        rua: "AVENIDA EPITACIO PESSOA",
        numero: "476",
        bairro: "CENTRO",
        municipio: "PLACIDO DE CASTRO",
        estado: "AC"
      }
    },
    {
      nome: "J CRUZ LTDA",
      longLat: [-67.805656417181, -9.971701268856],
      nomeFantasia: "FARMACIA DO CONSUMIDOR",
      endereco: {
        rua: "AVENIDA CEARA",
        numero: "952",
        bairro: "CERAMICA",
        municipio: "RIO BRANCO",
        estado: "AC"
      }
    },
    {
      nome: "EMPREENDIMENTOS PAGUE MENOS S/A",
      longLat: [-67.810917928727, -9.962390395795],
      nomeFantasia: "FARMACIA PAGUE NENOS",
      endereco: {
        rua: "RUA QUINTINO BOCAIUVA",
        numero: "1514",
        bairro: "BOSQUE",
        municipio: "RIO BRANCO",
        estado: "AC"
      }
    },
    {
      nome: "EMPREENDIMENTOS PAGUE MENOS S/A",
      longLat: [-67.805622912853, -9.972289591083],
      nomeFantasia: "EMPREENDIMENTOS PAGUE MENOS",
      endereco: {
        rua: "AVENIDA BRASIL",
        numero: "71",
        bairro: "CENTRO",
        municipio: "RIO BRANCO",
        estado: "AC"
      }
    },
    {
      nome: "EMPREENDIMENTOS PAGUE MENOS S/A",
      longLat: [-67.832838404506, -9.965748200804],
      nomeFantasia: "PAGUE MENOS",
      endereco: {
        rua: "AVENIDA NACOES UNIDAS",
        numero: "2890",
        bairro: "ESTACAO EXPERIMENTAL",
        municipio: "RIO BRANCO",
        estado: "AC"
      }
    }
  ]
  ;
  @ViewChild(MapaComponent) mapaComponent: MapaComponent;

  private farmaciasSubscription: Subscription;

   constructor(private appService: AppService, 

    private farmaciaService: FarmaciaService,
    private router: Router,
    private location: Location) {
    // this.getCurrentLocation();
  }
  
  ngAfterViewInit(): void {
    this.mapaComponent.updateSize();
    this.carregarMapa();
  }

  ngOnInit(): void {
    this.farmaciasSubscription = this.farmaciaService.farmacias.subscribe((data: Farmacia[]) => {
      this.farmacias = data;
      if(this.mapaComponent){
        this.long = data[0].longLat[0];
        this.lat = data[0].longLat[1];
        this.mapaComponent.addMarkers(this.farmacias);
        this.mapaComponent.updateView([ this.long, this.lat]);
      }
      
      // Detecta manualmente as mudanças após atualizar os dados
    });
    // Inicialize os dados ou realize outras operações necessárias ao inicializar o componente
  }

  public voltar(){
    this.location.back()
  }

  ngOnDestroy(): void {
    this.farmaciasSubscription.unsubscribe();
  }

  openControls(): void {
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      this.carregarMapa();
     });
    }
   else {
    alert("Geolocation is not supported by this browser.");
    }
   }

   public carregarMapa(){    
    this.mapaComponent.updateView([ this.long, this.lat]);
    this.mapaComponent.setTileSource();
    this.mapaComponent.updateSize();
   }

   public goToMaps(longLat: any[]){
     let url = `https://www.google.com/maps?q=${longLat[1]},${longLat[0]}`;
    window.open(url, '_blank');
   }
}
