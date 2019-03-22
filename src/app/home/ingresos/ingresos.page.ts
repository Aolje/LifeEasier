import { Router } from '@angular/router';
import { Component } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";
import { ActionSheetController, PopoverController } from '@ionic/angular';



@Component({
  selector: "app-ingresos",
  templateUrl: "./ingresos.page.html",
  styleUrls: ["./ingresos.page.scss"]
})
export class IngresosPage {
  nombre;
  valIngreso;
  suma;
  listaIngresosL = [];
  usuarioUid: string;
  slideOpts = {
    effect: 'flip'
  };


  constructor(
    private FB: FBservicesService, 
    public actionSheetController: ActionSheetController, 
    public popoverController: PopoverController, 
    private router: Router) {


    this.listaIngresosL = this.FB.mostrarTodosRealTime();
    console.log("Desde ingresos ListaIngresoL----", this.listaIngresosL);
    this.suma = this.FB.sumarI();
    console.log("Desde ingresos la suma----------", this.suma);
  }


  regisIngresos() {
    this.FB.crearIngreso(this.valIngreso, this.nombre);
    this.nombre = "";
    this.valIngreso = "";
    this.FB.mostrarTodosRealTime();
  }

  async presentActionSheet() {

    //Controla las opciones que puede hacer en ingresos
    const actionSheet = await this.actionSheetController.create({
      header: 'Que quieres hacer en ingresos',
      buttons: [{
        text: 'Añadir ingreso',
        icon: 'add'
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
