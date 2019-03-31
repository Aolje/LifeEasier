import { Router } from "@angular/router";
import { ActionSheetController, PopoverController } from "@ionic/angular";
import { Component } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

@Component({
  selector: "app-gastos",
  templateUrl: "./gastos.page.html",
  styleUrls: ["./gastos.page.scss"]
})
export class GastosPage {
  //variables que se utilizan en el HTML
  nombreGasto;
  valorGasto;
  tipoGasto;
  url;
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
    public popoverController: PopoverController,
    private router: Router,
    private localNotifications: LocalNotifications
  ) {
    
  }
  regisGasto() {
    this.FB.crearGasto(this.valorGasto, this.nombreGasto, this.tipoGasto);
    this.valorGasto = "";
    this.nombreGasto = "";
    this.tipoGasto = "";
    // this.url = "";
  }
  async presentActionSheet() {
    //Controla las opciones que puede hacer en ingresos
    const actionSheet = await this.actionSheetController.create({
      header: "Que deseas hacer en gastos...",
      buttons: [
        {
          text: "Añadir gasto",
          icon: "add"
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
 
}
