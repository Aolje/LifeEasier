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
  mostrarTI;
  listaIngresosL: any[] = [];
  usuarioUid: string;

  constructor(private FB: FBservicesService) {
    this.mostrarTI = this.FB.mostrarTotalIngresos();
  }

  regisIngresos() {
    this.FB.crearIngreso(this.valIngreso, this.nombre);
    this.nombre = "";
    this.valIngreso = "";
  }
  
  // getTodos() {
  //   this.FB.mostrarTotalIngresos();
  //   this.listaIngresosL = this.FB.listI;
  //   console.log("FB: ", this.FB.listI);
  //   console.log("ingresos.ts: ", this.listaIngresosL);
  //   return this.listaIngresosL;
  // }
}
