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
  farmacias: any[];
  ;
  @ViewChild(MapaComponent) mapaComponent: MapaComponent;

  private farmaciasSubscription: Subscription;

   constructor(private appService: AppService, 

    private farmaciaService: FarmaciaService,
    private router: Router,
    private location: Location) {
  }
  
  ngAfterViewInit(): void {
    if(this.mapaComponent){
      this.mapaComponent.addMarkers(this.farmacias);
      if(this.farmacias){
        this.long = this.farmacias[0].longLat[0];
        this.lat = this.farmacias[0].longLat[1];
        console.log(this.long, this.lat);
        
      }
      this.mapaComponent.updateSize();
      this.carregarMapa();
      this.getCurrentLocation();
    }
  }

  ngOnInit(): void {

    
    
    if(this.farmacias) {
      console.log("farmacia");
      
    }
    
    this.farmaciasSubscription = this.farmaciaService.farmacias.subscribe((data: Farmacia[]) => {
      
      this.farmacias = data;
      if(this.mapaComponent){
        console.log("entrou", this.farmacias);
        console.log("entrou aqq");
        this.long = data[0].longLat[0];
        this.lat = data[0].longLat[1];
        this.mapaComponent.addMarkers(this.farmacias);
        this.mapaComponent.updateView([ this.long, this.lat]);
        console.log(this.mapaComponent);
        
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
      console.log(position);
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

   public goToDetails(farmacia: Farmacia){
    this.farmaciaService.setFarmaciaAtual(farmacia);
    this.router.navigate(["detalhes"])
   }
}
