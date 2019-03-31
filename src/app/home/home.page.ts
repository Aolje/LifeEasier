import { Component } from '@angular/core';
import {MenuController} from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';
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
//  pages: [{
//    title: 'firs page',
//    url:'/home'
//  }];
//  selectedPath = '';
  constructor (private menu:MenuController,private router: Router, public FB:FBservicesService){
  // this.router.events.subscribe((event:RouterEvent) =>{
  //   this.selectedPath = event.url;
  // })   
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
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
