import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { ToastController, AlertController } from "@ionic/angular";
import { startTimeRange } from "@angular/core/src/profile/wtf_impl";

@Injectable({
  providedIn: "root"
})
export class FBservicesService {
  usuarioUid: string;
  //Variables para ingresos
  public listI: any[] = [];
  valorT: any[] = [];
  val;
  public totalIngreso;
  //Variables para gastos
  public listG: any[] = [];
  valorTG: any[] = [];
  valG;
  public totalGasto;

  // public totalIngreso;
  // public totalIngreso;

  config = {
    apiKey: "AIzaSyC_L6v7n92EEAvwJaEww1N6UcEO0hDDt0E",
    authDomain: "tienda-4a591.firebaseapp.com",
    databaseURL: "https://tienda-4a591.firebaseio.com",
    projectId: "tienda-4a591",
    storageBucket: "tienda-4a591.appspot.com",
    messagingSenderId: "979469927756"
  };

  constructor(
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
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

  crearGasto(valorGasto, nombreGasto, tipoGasto) {
    this.usuarioUid = firebase.auth().currentUser.uid;
    console.log(this.usuarioUid);
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/gastos/" + nombreGasto)
      .set({
        nombre: nombreGasto,
        valor: valorGasto,
        tipo: tipoGasto
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
        console.log("Tabla Ingresos-->", this.listI);
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
    return this.totalIngreso;
  }

  mostrarTodoGastos() {
    this.usuarioUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/gastos")
      .on("value", snapshot => {
        this.listG = [];
        this.valorT = [];
        snapshot.forEach(element => {
          this.listG.push(element.val());
          this.valorT.push();
        });
        console.log("Tabla Gastos-->", this.listG);
      });
    return this.listG;
  }
  // Metodo para sumar todos los gastos del usuario
  sumarG() {
    this.totalGasto = 0;
    for (let index = 0; index < this.mostrarTodoGastos().length; index++) {
      const element = this.mostrarTodoGastos()[index].valor;
      this.valG = element;
      this.totalGasto = this.totalGasto + this.valG;
    }
    return this.totalGasto;
  }

  recuperarClave(correo) {
    var auth = firebase.auth();
    auth
      .sendPasswordResetEmail(correo)
      .then(() => {
        this.alertRecuperacion();
      })
      .catch(error => {
        this.toastRecuperacionFail();
        console.log("correo no enviado validar correo", error);
      });
  }
  async alertRecuperacion() {
    const alert = await this.alertController.create({
      header: "Revisa tu correo electronico",
      message:
        "Hemos enviado un email de recuperación a tu cuenta de correo electronico.",
      buttons: ["Vale!"]
    });

    await alert.present();
  }
  async toastRecuperacionFail() {
    const toast = await this.toastController.create({
      message: "Por favor revisar el correo electronico ya que no existe en Life$Easier",
      duration: 7000
    });
    toast.present();
  }
}
