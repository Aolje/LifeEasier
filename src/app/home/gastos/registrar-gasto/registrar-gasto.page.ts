import { Component, OnInit } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";
import {
  ActionSheetController,
  PopoverController,
  ToastController
} from "@ionic/angular";
import { Router } from "@angular/router";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

@Component({
  selector: "app-registrar-gasto",
  templateUrl: "./registrar-gasto.page.html",
  styleUrls: ["./registrar-gasto.page.scss"]
})
export class RegistrarGastoPage {
  //variables que se utilizan en el HTML
  nombreGasto;
  valorGasto;
  tipoGasto;
  url;
  constructor(
    private FB: FBservicesService,
    private router: Router,
    public toastController: ToastController
  ) {}

  regisGasto() {
    if (this.nombreGasto == null) {
      this.toastFaltanCampos();
    } else if (this.valorGasto == null) {
      this.toastFaltanCampos();
    } else if (this.valorGasto < 1) {
      this.valorGasto = "";
      this.toastNumeroFail();
    } else {
      this.FB.crearGasto(this.valorGasto, this.nombreGasto, this.tipoGasto);
      this.valorGasto = "";
      this.nombreGasto = "";
      this.tipoGasto = "";
      this.router.navigate(["gastos"]);
      this.toastCreado();
    }
  }
  async toastCreado() {
    const toast = await this.toastController.create({
      message: "☑  Has creado un Gasto.",
      color: "success",
      cssClass: [],
      duration: 3000
    });
    toast.present();
  }
  async toastFaltanCampos() {
    const toast = await this.toastController.create({
      message: "Por favor diligencia los campos",
      duration: 3000
    });
    toast.present();
  }

  async toastNumeroFail() {
    const toast = await this.toastController.create({
      message: "Por favor ingrese un numero valido",
      duration: 3000
    });
    toast.present();
  }
  
  cerrarCGasto() {
    this.router.navigate(["gastos"]);
  }
}
