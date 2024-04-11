import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultadoComponent } from './components/resultado/resultado.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: "resultado", component: ResultadoComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }