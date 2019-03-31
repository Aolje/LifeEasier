import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

import * as firebase from "firebase";
import { FBservicesService } from "../fbservices.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  email:string;
  password:string;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private FB: FBservicesService
  ) {
    //this.FB.verificarsesion();
  }

  irPaginaRegistro() {
    this.router.navigate(["registrar"]);
  }
  irPaginaHome() {
    this.FB.iniciarSesion(this.email, this.password);
  }
  recuperarCuenta(){
    this.router.navigate(["recuperacion"]);
  }
}
