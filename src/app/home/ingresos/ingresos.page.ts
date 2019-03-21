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
  slideOpts = {
    effect: 'flip'
  };

  constructor(private FB: FBservicesService) {
    this.listaIngresosL = this.FB.mostrarTodosRealTime();
    console.log("Desde ingresos ListaIngresoL----",this.listaIngresosL);
    this.suma = this.FB.sumarI();
    console.log("Desde ingresos la suma----------",this.suma);
  }

  regisIngresos() {
    this.FB.crearIngreso(this.valIngreso, this.nombre);
    this.nombre = "";
    this.valIngreso = "";
    this.FB.mostrarTodosRealTime();
  }
}
