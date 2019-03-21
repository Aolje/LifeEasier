import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { ToastController } from "@ionic/angular";
import { startTimeRange } from "@angular/core/src/profile/wtf_impl";

@Injectable({
  providedIn: "root"
})
export class FBservicesService {
  usuarioUid: string;
  public listI: any[] = [];
  public prueba = [
    {
      nombre: "Uno",
      valor: 1000
    },
    {
      nombre: "Dos",
      valor: 2000
    },
    {
      nombre: "Tres",
      valor: 30000
    },
    {
      nombre: "Cuatro",
      valor: 40
    },
    {
      nombre: "Cinco",
      valor: 555
    },
    {
      nombre: "Seis",
      valor: 606000
    },
    {
      nombre: "Siete",
      valor: 70700
    }
  ];
  valorT: any[] = [];
  public totalIngreso;
  val;

  config = {
    apiKey: "AIzaSyC_L6v7n92EEAvwJaEww1N6UcEO0hDDt0E",
    authDomain: "tienda-4a591.firebaseapp.com",
    databaseURL: "https://tienda-4a591.firebaseio.com",
    projectId: "tienda-4a591",
    storageBucket: "tienda-4a591.appspot.com",
    messagingSenderId: "979469927756"
  };

  constructor(private router: Router, public toastController: ToastController) {
    firebase.initializeApp(this.config);
    this.verificarsesion();
  }

  iniciarSesion(email, password) {
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Se inicio correctamente");
        console.log("ususuario:", firebase.auth().currentUser);
        console.log("token ususuario:", firebase.auth().currentUser.uid);
        this.router.navigate(["home"]);
      })
      .catch(error => {
        this.toastErrorAutenticacion();
        console.log(error);
      });
  }

  crearUsuario(email, password, user, password2) {
    if (password == password2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.usuarioUid = firebase.auth().currentUser.uid;
          console.log("Se creo correctamente");
          console.log(firebase.auth().currentUser.uid);

          firebase
            .database()
            .ref("usuarios/" + this.usuarioUid + "/datosBasicos")
            .set({
              usuario: user,
              email: email
            });
        });
      this.toastRegistroCorrecto().catch(error => {
        console.log(error);
      });
    } else {
      this.toastContras();
    }
    this.router.navigate(["login"]);
  }

  async toastContras() {
    const toast = await this.toastController.create({
      message: "Las contraseñas no se parecen",
      duration: 5000
    });
    toast.present();
  }

  async toastRegistroCorrecto() {
    const toast = await this.toastController.create({
      message: "Te has registrado correctamente",
      duration: 5000
    });
    toast.present();
  }

  async toastErrorAutenticacion() {
    const toast = await this.toastController.create({
      message: "Usuario y/o contraseña incorrectos. Intentelo de nuevo.",
      duration: 5000
    });
    toast.present();
  }

  async toastConfirmarDataIngresada() {
    const toast = await this.toastController.create({
      message: "Lo has agregado correctamente.",
      duration: 5000
    });
    toast.present();
  }

  crearIngreso(valorIngreso, nombre) {
    this.usuarioUid = firebase.auth().currentUser.uid;
    console.log(this.usuarioUid);
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/ingresos/" + nombre)
      .set({
        nombre: nombre,
        valor: valorIngreso
      });
    this.toastConfirmarDataIngresada();
  }

  crearGasto(valorGasto, nombreGasto, tipoGasto, url) {
    this.usuarioUid = firebase.auth().currentUser.uid;
    console.log(this.usuarioUid);
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/gastos/" + nombreGasto)
      .set({
        nombre: nombreGasto,
        valor: valorGasto,
        tipo: tipoGasto,
        url: url
      });
    this.toastConfirmarDataIngresada();
  }
  crearIngresoExtra(valorIngresoE, nombreIE, descripcionIE) {
    this.usuarioUid = firebase.auth().currentUser.uid;
    console.log(this.usuarioUid);
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/ingresosExtra/" + nombreIE)
      .set({
        nombre: nombreIE,
        valor: valorIngresoE,
        descripcion: descripcionIE
      });
  }
  crearGastoExtra(valorGastoE, nombreGE, descripcionGE) {
    this.usuarioUid = firebase.auth().currentUser.uid;
    console.log(this.usuarioUid);
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/gastosExtra/" + nombreGE)
      .set({
        nombre: nombreGE,
        valor: valorGastoE,
        descripcion: descripcionGE
      });
  }
  cerrarSesion() {
    firebase.auth().signOut();
  }
  verificarsesion() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Ya hay una sesion activa, puede ir a home. °u° ");
        this.router.navigate(["home"]);
      } else {
        console.log("No hay sesion, toca loguear");
        this.router.navigate(["login"]);
      }
    });
  }
  mostrarTodosRealTime() {
    this.usuarioUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/ingresos")
      .on("value", snapshot => {
        this.listI = [];
        this.valorT = [];
        snapshot.forEach(element => {
          this.listI.push(element.val());
          this.valorT.push();
        });
        console.log("realtime Data base ", this.listI);
      });
    return this.listI;
  }

  mostrarTotalIngresos() {
    this.usuarioUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/ingresos")
      .once("value")
      .then(snapshot => {
        this.listI = [];
        this.valorT = [];
        snapshot.forEach(element => {
          this.listI.push(element.val());
          this.valorT.push();
        });
        console.log("Desde FB usuario es: ", this.usuarioUid);
        console.log("Desde FB: ", this.listI);
      });
    return this.listI;
  }

  // Metodo para sumar todos los ingresos del documento
  sumarI() {
    this.totalIngreso = 0;
    for (let index = 0; index < this.mostrarTodosRealTime().length; index++) {
      const element = this.mostrarTodosRealTime()[index].valor;
      this.val = element;
      this.totalIngreso = this.totalIngreso + this.val;
    }
    console.log("IMPRIME VALOR DEL total ---> ", this.totalIngreso);
    return this.totalIngreso;
  }
}
