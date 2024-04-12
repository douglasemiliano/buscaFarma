import { AfterViewInit, Component } from '@angular/core';
import { GeoService } from './services/geo.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { AppService } from './services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router){ 
  }

  public goToHome(){
    this.router.navigate(["home"]);
  }
}