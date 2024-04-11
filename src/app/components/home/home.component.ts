import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmaciaService } from 'src/app/services/farmacia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  pesquisa: FormControl =  new FormControl("", [Validators.required])

  constructor(private farmaciaService: FarmaciaService, private router: Router){
    console.log("entrou");
  }

  onSubmit(){
    this.farmaciaService.buscarFarmaciaPorUF(this.pesquisa.value.toUpperCase());
    this.router.navigate(["resultado"]);
  }
}
