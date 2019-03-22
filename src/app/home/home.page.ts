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
  sumaI;
  sumaE;
  sumaIE;
  sumaEE;

  constructor (private menu:MenuController,private router: Router, public FB:FBservicesService){
    this.sumaI = this.FB.sumarI();
    this.sumaE = this.FB.sumarG();
    console.log('total --I--- ' , this.sumaI);
    console.log('total --G--- ' , this.sumaE);
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
