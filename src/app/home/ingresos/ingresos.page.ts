import { Component } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";

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

  constructor(private FB: FBservicesService) {
    this.listaIngresosL = this.FB.mostrarTotalIngresos();
    this.suma = this.FB.sumarI();
  }

  regisIngresos() {
    this.FB.crearIngreso(this.valIngreso, this.nombre);
    this.nombre = "";
    this.valIngreso = "";
  }
}
