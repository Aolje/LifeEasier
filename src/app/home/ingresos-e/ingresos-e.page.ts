import { Component, OnInit } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";

@Component({
  selector: "app-ingresos-e",
  templateUrl: "./ingresos-e.page.html",
  styleUrls: ["./ingresos-e.page.scss"]
})
export class IngresosEPage {
  nombre;
  valor;
  descripcion;
  constructor(public FB: FBservicesService) {}

  // crearIngresoExtra() {
  //   this.FB.crearIngresoExtra(this.nombre, this.valor, this.descripcion);
  //   this.nombre="";
  //   this.valor="";
  //   this.descripcion="";
  // }
}
