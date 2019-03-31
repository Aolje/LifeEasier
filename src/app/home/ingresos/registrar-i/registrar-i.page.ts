import { Component, OnInit } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";
import {
  ActionSheetController,
  PopoverController,
  ToastController
} from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-registrar-i",
  templateUrl: "./registrar-i.page.html",
  styleUrls: ["./registrar-i.page.scss"]
})
export class RegistrarIPage {
  //variables que se utilizan en el HTML
  nombre;
  valIngreso;
  constructor(
    private FB: FBservicesService,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    private router: Router,
    public toastController: ToastController
  ) {}
  regisIngresos() {
    if (this.nombre == null) {
      this.toastFaltanCampos();
    } else if (this.valIngreso == null) {
      this.toastFaltanCampos();
    } else if (this.valIngreso < 1) {
      this.valIngreso = "";
      this.toastNumeroFail();
    } else {
      this.FB.crearIngreso(this.valIngreso, this.nombre);
      this.nombre = "";
      this.valIngreso = "";
      this.router.navigate(["ingresos"]);
      this.toastCreado();
    }
  }

  async toastCreado() {
    const toast = await this.toastController.create({
      message: "☑  Has creado un ingreso.",
      color: "secondary",
      cssClass:[],
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
  cerrarCrearIngreso() {
    this.router.navigate(["ingresos"]);
  }
}
