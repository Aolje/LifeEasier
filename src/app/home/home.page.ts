import { Component } from '@angular/core';
import {MenuController} from '@ionic/angular';
import { Router } from '@angular/router';
import { FBservicesService} from '../fbservices.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  valorIngreso;
  mostrarTotalI;
  

  constructor (private menu:MenuController,private router: Router, public FB:FBservicesService){
   this.mostrarTotalI = this.FB.sumarI();
  }
  irIngresos(){
    this.router.navigate(["ingresos"]);
  }
  irGastos(){
    this.router.navigate(["gastos"]);
  }
  cerrarSesion(){
    this.FB.cerrarSesion();
  }
}
