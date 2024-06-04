import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';


const routes: Routes = [
  { path: "home", component: AvaliacaoComponent },
  { path: "resultado", component: ResultadoComponent},
  { path: "", redirectTo: "/avaliacao", pathMatch: "full" },
  { path: "detalhes", component: DetalhesComponent},
  { path: "avaliacao", component: AvaliacaoComponent}

];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }