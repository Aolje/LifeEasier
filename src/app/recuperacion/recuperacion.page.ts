import { Component, OnInit } from '@angular/core';
import { FBservicesService } from "src/app/fbservices.service";

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage  {
correoRecuperacion;
  constructor(private FB: FBservicesService) { }

recuperarClave(){
this.FB.recuperarClave(this.correoRecuperacion);
}

}
