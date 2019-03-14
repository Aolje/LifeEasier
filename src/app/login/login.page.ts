import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

import * as firebase from "firebase";
import { FBservicesService } from '../fbservices.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email;
  password;

  
  constructor(public navCtrl: NavController, private router: Router, private FB:FBservicesService) {
    this.FB.verificarsesion();
  }

  irPaginaRegistro() {
    this.router.navigate(["registrar"]);
  }
  irPaginaHome(email, password) {
    this.FB.iniciarSesion(this.email,this.password);
    console.log("token ususuario:", firebase.auth().currentUser.uid);    
    
  }
  ngOnInit() {}
}
