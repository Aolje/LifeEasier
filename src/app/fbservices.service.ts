import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { ToastController, AlertController } from "@ionic/angular";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { Console } from "@angular/core/src/console";

@Injectable({
  providedIn: "root"
})
export class FBservicesService {
  usuarioUid: string;
  totalGastoP;
  numeroIngresos;
  numeroGastos;
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

  // Variable usuario
  usuario: string;

  fecha: Date;
  milisegundos = 5000;

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
    public alertController: AlertController,
    private localNotifications: LocalNotifications
  ) {
    firebase.initializeApp(this.config);
    this.verificarsesion();
  }
  mostrarNombre() {
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/datosBasicos")
      .on("value", snapshot => {
        this.usuario = snapshot.val().usuario;
        console.log(this.usuario);
      });
  }

  iniciarSesion(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Se inicio correctamente");
        console.log("ususuario:", firebase.auth().currentUser);
        console.log("token ususuario:", firebase.auth().currentUser.uid);
        //this.router.navigate(["home"]);
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
  async toastCreadoG() {
    const toast = await this.toastController.create({
      message: "☑  Has creado un Gasto.",
      color: "success",
      cssClass: [],
      duration: 3000
    });
    toast.present();
  }
  async toastCreadoI() {
    const toast = await this.toastController.create({
      message: "☑  Has creado un Gasto.",
      color: "success",
      cssClass: [],
      duration: 3000
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
      this.toastCreadoI();
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
    this.toastCreadoG();
    this.registerNotification();
  }
  // crearIngresoExtra(valorIngresoE, nombreIE, descripcionIE) {
  //   this.usuarioUid = firebase.auth().currentUser.uid;
  //   console.log(this.usuarioUid);
  //   firebase
  //     .database()
  //     .ref("usuarios/" + this.usuarioUid + "/ingresosExtra/" + nombreIE)
  //     .set({
  //       nombre: nombreIE,
  //       valor: valorIngresoE,
  //       descripcion: descripcionIE
  //     });
  // }
  // crearGastoExtra(valorGastoE, nombreGE, descripcionGE) {
  //   this.usuarioUid = firebase.auth().currentUser.uid;
  //   console.log(this.usuarioUid);
  //   firebase
  //     .database()
  //     .ref("usuarios/" + this.usuarioUid + "/gastosExtra/" + nombreGE)
  //     .set({
  //       nombre: nombreGE,
  //       valor: valorGastoE,
  //       descripcion: descripcionGE
  //     });
  // }
  cerrarSesion() {
    firebase.auth().signOut();
  }
  verificarsesion() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Ya hay una sesion activa, puede ir a home. °u° ");
        this.router.navigate(["home"]);
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.mostrarNombre();
        this.mostrarTodoGastosPagados();
        console.log("usuario:", this.usuarioUid);
        console.log("total --Ingreso--- ", this.mostrarTodosRealTime());
        console.log("total --Gasto--- ", this.mostrarTodoGastos());
      } else {
        console.log("No hay sesion, toca loguear");
        this.router.navigate(["login"]);
      }
    });
  }
  mostrarTodosRealTime() {
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/ingresos")
      .on("value", snapshot => {
        this.listI = [];
        snapshot.forEach(element => {
          this.listI.push(element.val());
          this.numeroIngresos = this.listI.length;
        });
        this.sumarI(this.listI);
      });
  }
  // Metodo para sumar todos los ingresos del documento
  sumarI(listaI) {
    this.totalIngreso = 0;
    for (let index = 0; index < listaI.length; index++) {
      const element = listaI[index].valor;
      this.val = element;
      this.totalIngreso = this.totalIngreso + this.val;
    }
  }
  mostrarTodoGastos() {
    // this.usuarioUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/gastos")
      .on("value", snapshot => {
        this.listG = [];
        snapshot.forEach(element => {
          this.listG.push(element.val());
          this.numeroGastos = this.listG.length;
        });
        this.sumarG(this.listG);
      });
  }
  // Metodo para sumar todos los gastos del usuario
  sumarG(listG) {
    this.totalGasto = 0;
    for (let index = 0; index < listG.length; index++) {
      const element = listG[index].valor;
      this.valG = element;
      this.totalGasto = this.totalGasto + this.valG;
    }
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
      message:
        "Por favor revisar el correo electronico ya que no existe en Life$Easier",
      duration: 7000
    });
    toast.present();
  }
  registerNotification() {
    this.localNotifications.schedule({
      title: `my ${this.milisegundos} notification`,
      text: `descripcion pikachu`,
      trigger: { at: new Date(new Date().getTime() + this.milisegundos) }
    });
  }
  eventoEliminarIngreso(nombreAEliminar) {
    console.log("Esto es lo que se eliminara---->", nombreAEliminar);
    try {
      firebase
        .database()
        .ref("usuarios/" + this.usuarioUid + "/ingresos/" + nombreAEliminar)
        .remove();
      this.toastElimino();
    } catch (error) {
      console.log("No se pudo eliminar: ", error);
    }
  }
  eventoEliminarGasto(nombreAEliminar) {
    console.log("Esto es lo que se eliminara---->", nombreAEliminar);
    try {
      firebase
        .database()
        .ref("usuarios/" + this.usuarioUid + "/gastos/" + nombreAEliminar)
        .remove();
      this.toastElimino();
    } catch (error) {
      console.log("No se pudo eliminar: ", error);
    }
  }
  async toastElimino() {
    const toast = await this.toastController.create({
      message: "Se ha eliminado correctamente",
      color: "danger",
      duration: 7000
    });
    toast.present();
  }
  pagar(nombreGastoPagado) {
    this.usuarioUid = firebase.auth().currentUser.uid;
    console.log(this.usuarioUid);
    firebase.database().ref().child("usuarios/" + this.usuarioUid + "/gastos/" + nombreGastoPagado).update({
        estado: 1
      });
      console.log('estado actualizado a 1');

  
}

  mostrarTodoGastosPagados() {
    // this.usuarioUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("usuarios/" + this.usuarioUid + "/gastos")
      .on("value", snapshot => {
        this.listG = [];
        snapshot.forEach(element => {
          this.listG.push(element.val());
          this.numeroGastos = this.listG.length;
        });
        this.sumarGastosPagados(this.listG);
      });
  }
  sumarGastosPagados(listG) {
    this.totalGastoP = 0;
    for (let index = 0; index < listG.length; index++) {
        if(listG[index].estado == 1){
          const element = listG[index].valor;
          this.valG = element;
          this.totalGastoP = this.totalGastoP + this.valG;
        }  
      console.log('total par ---- ' , this.totalGastoP);
    }
  }
}
