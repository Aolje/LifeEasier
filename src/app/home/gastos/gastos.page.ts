import { Router } from "@angular/router";
import { ActionSheetController, PopoverController } from "@ionic/angular";
import { Component } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { NgStyle } from '@angular/common';

@Component({
  selector: "app-gastos",
  templateUrl: "./gastos.page.html",
  styleUrls: ["./gastos.page.scss"]
})
export class GastosPage {
  // mostrar: VisibilityState = "visible";
  mostrar: boolean = false;
  id: string;
  //variable suma es la suma de los gastos
  suma;
  //Aquí se guarda el array con todos los gastos
  listaGastosL = [];
  //variable del usuario autenticado
  usuarioUid: string;
  //La segmentación para la opción de efectivo y electronico
  segmentChanged(ev: any) {
    console.log("Segment changed", ev);
  }

  constructor(
    private FB: FBservicesService,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  async presentActionSheet() {
    //Controla las opciones que puede hacer en ingresos
    const actionSheet = await this.actionSheetController.create({
      header: "Que deseas hacer en gastos",
      buttons: [
        {
          text: "Añadir gasto",
          icon: "add",
          handler: () => {
            this.router.navigate(["registrar-gasto"]);
          }
        },
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
  pruebaEliminar(dato: string) {
    this.id = dato;
    console.log(this.id);
    this.mostrar = !this.mostrar;   
  }
  eventoEliminar() {
    this.FB.gastoEliminado(this.id);
  }
  eliminarGastoEliminado(){
    this.FB.eventoEliminarGasto(this.id);
  }
  pagarGasto() {
    this.FB.pagar(this.id);
  }

}
