import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";
import { ActionSheetController, PopoverController } from "@ionic/angular";

@Component({
  selector: "app-ingresos",
  templateUrl: "./ingresos.page.html",
  styleUrls: ["./ingresos.page.scss"]
})
export class IngresosPage {
  //propiedad para el slider --- OCULTO----
  // slideOpts = {
  //   effect: "flip"
  // };

  constructor(
    private FB: FBservicesService,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    private router: Router
  ) {}

  async presentActionSheet() {
    //Controla las opciones que puede hacer en ingresos
    const actionSheet = await this.actionSheetController.create({
      header: "Que quieres hacer en ingresos",
      buttons: [
        {
          text: "Añadir ingreso",
          icon: "add",
          handler: () => {
            this.router.navigate(["registrar-i"]);
          }
        },{
          text:"Eliminar ingreso",
          icon: "remove",
          handler: () =>{
            console.log("ME OPRIMISTE PARA ELIMINAR UN INGRESO")
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
}
