import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CampaniaComponent} from "./campania/campania.component";
import {ContactoComponent} from "./contacto/contacto.component";

const routes: Routes = [
  {path:'campain',component:CampaniaComponent},
  {path:'contacto',component:ContactoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
