import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AseguradorasComponent } from './components/aseguradoras/aseguradoras.component';
import { CitasComponent } from './components/citas/citas.component';
import { ClinicasComponent } from './components/clinicas/clinicas.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { MaterialModule } from 'src/app/material.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormAseguradoraComponent } from './components/aseguradoras/form-aseguradora/form-aseguradora.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormCitasComponent } from './components/citas/form-citas/form-citas.component';
import { FormClinicasComponent } from './components/clinicas/form-clinicas/form-clinicas.component';
import { FormConsultasComponent } from './components/consultas/form-consultas/form-consultas.component';
import { FormEspecialidadesComponent } from './components/especialidades/form-especialidades/form-especialidades.component';
import { FormPacientesComponent } from './components/pacientes/form-pacientes/form-pacientes.component';
import { FormTratamientosComponent } from './components/tratamientos/form-tratamientos/form-tratamientos.component';
import { FormUsuariosComponent } from './components/usuarios/form-usuarios/form-usuarios.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { FormMedicosComponent } from './components/medicos/form-medicos/form-medicos.component';

@NgModule({
  declarations: [
    AdminComponent,
    AseguradorasComponent,
    CitasComponent,
    ClinicasComponent,
    ConsultasComponent,
    EspecialidadesComponent,
    PacientesComponent,
    TratamientosComponent,
    UsuariosComponent,
    FormAseguradoraComponent,
    NavbarComponent,
    FormCitasComponent,
    FormClinicasComponent,
    FormConsultasComponent,
    FormEspecialidadesComponent,
    FormPacientesComponent,
    FormTratamientosComponent,
    FormUsuariosComponent,
    MedicosComponent,
    FormMedicosComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
