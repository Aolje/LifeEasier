import { Component} from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";
import * as firebase from "firebase";

@Component({
  selector: "app-ingresos",
  templateUrl: "./ingresos.page.html",
  styleUrls: ["./ingresos.page.scss"]
})
export class IngresosPage {
  nombre;
  valIngreso;
  constructor(private FB: FBservicesService) {}

  regisIngresos(){
    this.FB.crearIngreso(this.valIngreso,this.nombre);
    this.nombre = "";
    this.valIngreso = "";
  }


}
