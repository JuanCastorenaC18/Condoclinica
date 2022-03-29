import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './generar/crear/crear.component';
import { GenerarComponent } from './generar/generar.component';
import { PacienteComponent } from './paciente.component';

const routes: Routes = [{ path: '', component: PacienteComponent, children:[
  {path:'verCita', component:GenerarComponent},
  {path:'generarCita', component:CrearComponent},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
