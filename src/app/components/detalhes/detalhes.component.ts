import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import { Farmacia } from 'src/app/models/farmacia';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { MapaComponent } from '../mapa/mapa.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MapaDetalheComponent } from '../mapa-detalhe/mapa-detalhe.component';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit, OnDestroy, AfterViewInit{

  lat: number;
  long: number;
  private subscription: Subscription
 
  public farmacia: any = {
    nome: 'Farmácia ABC',
    longLat: [ -34.865892424651,
      -7.119965784773],
    nomeFantasia: 'Farmácia da Esquina',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      municipio: 'Recife',
      estado: 'PE'
    },
    produtos: ['Medicamento A', 'Medicamento B', 'Medicamento C']
  };

  public localizacao: any = {
    longLat: []
  };

  posicaoUsuario: any = {
    longLat: []
  }

  posicao: number[];

  comentarios: string[] = []; // Lista de comentários
  comentario: FormControl =  new FormControl("", [Validators.required])
  
  @ViewChild(MapaDetalheComponent) mapaComponent: MapaDetalheComponent;

  constructor(private farmaciaService: FarmaciaService, private router: Router, private activatedRoute: ActivatedRoute){
        // // Observa as mudanças de rota
        // this.router.events.pipe(
        //   filter(event => event instanceof NavigationEnd)
        // ).subscribe(() => {
        //   // Navega para a mesma rota
        //   this.router.navigate([this.activatedRoute.snapshot.url]);
        // });
  }


  ngAfterViewInit(): void {
    this.carregarMapa();
    if(this.mapaComponent){
      console.log(this.farmaciaService.localizacao);
      console.log(this.localizacao);
      
      
      this.mapaComponent.addMarkers([this.farmacia, this.localizacao]);
      this.mapaComponent.updateView([ this.localizacao.longLat[0], this.localizacao.longLat[1]]);
    }
  }

  public enviarComentario() {
    this.comentarios.push(this.comentario.value);
    this.comentario.reset()
  }

  ngOnInit(): void {
    this.getCurrentLocation();
    this.localizacao.longLat = this.farmaciaService.localizacao;
    console.log(this.localizacao);
    
    this.subscription = this.farmaciaService.farmaciaAtual.subscribe( {
      next: (farmacia: any) => {
        console.log(farmacia);
        
        if(farmacia) {
          this.farmacia = farmacia;
        }
      }, error : (error: any) => {
        console.log(error);

      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public carregarMapa(){    
    this.mapaComponent.updateView([ this.farmacia?.longLat[1], this.farmacia?.longLat[0]]);
    this.mapaComponent.setTileSource();
    this.mapaComponent.updateSize();
   }

   getCurrentLocation() {
    this.farmaciaService.localizacaoUsuario.subscribe(data => {
      if (this.mapaComponent){
        this.mapaComponent.addMarkers(this.posicaoUsuario)
        this.mapaComponent.updateView(this.posicaoUsuario.longLat[0]);
;      }
      this.posicaoUsuario.longLat = data;
      this.posicao = data;
    })
   }
}
