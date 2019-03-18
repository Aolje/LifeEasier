import { Component, OnInit } from "@angular/core";
import { FBservicesService } from "src/app/fbservices.service";

@Component({
  selector: "app-gastos",
  templateUrl: "./gastos.page.html",
  styleUrls: ["./gastos.page.scss"]
})
export class GastosPage {
  constructor(private FB: FBservicesService) {}
  nombreGasto;
  valorGasto;
  tipoGasto;
  url;

  regisGasto() {
    this.FB.crearGasto(
      this.valorGasto,
      this.nombreGasto,
      this.tipoGasto,
      this.url
    );
    this.valorGasto = "";
    this.nombreGasto = "";
    this.tipoGasto = "";
    this.url = "";
  }
}
