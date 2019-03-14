import { Component, OnInit } from "@angular/core";

import { AlertController, ToastController } from "@ionic/angular";
import { FBservicesService } from "../fbservices.service";

@Component({
  selector: "app-registrar",
  templateUrl: "./registrar.page.html",
  styleUrls: ["./registrar.page.scss"]
})
export class RegistrarPage {
  email;
  password;
  password2;
  user;
  constructor(
    public alertController: AlertController,
    private FB: FBservicesService,
    public toastController: ToastController
  ) {}

  crear() {
    this.FB.crearUsuario(this.email, this.password,this.user, this.password2);
  }
 
}
