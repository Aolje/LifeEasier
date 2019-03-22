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
  //variables que se utilizan en el HTML
  nombre;
  valIngreso;
  //variable suma es la suma de los ingresos
  suma;
  //Aquí se guarda el array con todos los ingresos
  listaIngresosL = [];
  //variable del usuario autenticado
  usuarioUid: string;

  //propiedad para el slider
  slideOpts = {
    effect: 'flip'
  };


  constructor(
    private FB: FBservicesService,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    private router: Router) {
    this.listaIngresosL = this.FB.mostrarTodosRealTime();
    this.suma = this.FB.sumarI();
  }


  regisIngresos() {
    this.FB.crearIngreso(this.valIngreso, this.nombre);
    this.nombre = "";
    this.valIngreso = "";
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
