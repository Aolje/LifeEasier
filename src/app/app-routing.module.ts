import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'registrar', loadChildren: './registrar/registrar.module#RegistrarPageModule' },
  { path: 'ingresos', loadChildren: './home/ingresos/ingresos.module#IngresosPageModule' }, 
  { path: 'gastos', loadChildren: './home/gastos/gastos.module#GastosPageModule' },
  { path: 'ingresos-e', loadChildren: './home/ingresos-e/ingresos-e.module#IngresosEPageModule' },
  { path: 'gastos-e', loadChildren: './home/gastos-e/gastos-e.module#GastosEPageModule' },  { path: 'registrar-i', loadChildren: './home/ingresos/registrar-i/registrar-i.module#RegistrarIPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
