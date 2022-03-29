import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { MaterialModule } from 'src/app/material.module';
import { GenerarComponent } from './generar/generar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CrearComponent } from './generar/crear/crear.component';


@NgModule({
  declarations: [
    PacienteComponent,
    GenerarComponent,
    NavbarComponent,
    CrearComponent,
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    MaterialModule
  ]
})
export class PacienteModule { }
