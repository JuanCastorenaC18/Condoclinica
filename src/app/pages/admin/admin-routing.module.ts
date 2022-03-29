import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AseguradorasComponent } from './components/aseguradoras/aseguradoras.component';
import { FormAseguradoraComponent } from './components/aseguradoras/form-aseguradora/form-aseguradora.component';
import { CitasComponent } from './components/citas/citas.component';
import { FormCitasComponent } from './components/citas/form-citas/form-citas.component';
import { ClinicasComponent } from './components/clinicas/clinicas.component';
import { FormClinicasComponent } from './components/clinicas/form-clinicas/form-clinicas.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { FormConsultasComponent } from './components/consultas/form-consultas/form-consultas.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { FormEspecialidadesComponent } from './components/especialidades/form-especialidades/form-especialidades.component';
import { FormMedicosComponent } from './components/medicos/form-medicos/form-medicos.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { FormPacientesComponent } from './components/pacientes/form-pacientes/form-pacientes.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { FormTratamientosComponent } from './components/tratamientos/form-tratamientos/form-tratamientos.component';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { FormUsuariosComponent } from './components/usuarios/form-usuarios/form-usuarios.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [{ path: '', component: AdminComponent, children:[
    { path: 'usuarios', component:UsuariosComponent},
    { path: 'aseguradoras', component:AseguradorasComponent},
    { path: 'citas', component: CitasComponent},
    { path: 'clinicas', component: ClinicasComponent},
    { path: 'consultas', component: ConsultasComponent},
    { path: 'especialidades', component: EspecialidadesComponent},
    { path: 'pacientes', component: PacientesComponent},
    { path: 'medicos', component: MedicosComponent},
    { path: 'tratamientos', component: TratamientosComponent},
    { path: 'crearUsuario', component: FormUsuariosComponent},
    { path: 'editarUsuario', component: FormUsuariosComponent},
    { path: 'crearAseguradora', component: FormAseguradoraComponent},
    { path: 'editarAseguradora', component: FormAseguradoraComponent},
    { path: 'crearCita', component: FormCitasComponent},
    { path: 'editarCita', component: FormCitasComponent},
    { path: 'crearClinica', component: FormClinicasComponent},
    { path: 'editarClinica', component: FormClinicasComponent},
    { path: 'crearClinica', component: FormClinicasComponent},
    { path: 'editarClinica', component: FormClinicasComponent},
    { path: 'crearConsultas', component: FormConsultasComponent},
    { path: 'editarConsultas', component: FormConsultasComponent},
    { path: 'crearEspecialidad', component: FormEspecialidadesComponent},
    { path: 'editarEspecialidad', component: FormEspecialidadesComponent},
    { path: 'crearPacientes', component: FormPacientesComponent},
    { path: 'editarPacientes', component: FormPacientesComponent},
    { path: 'crearTratamiento', component: FormTratamientosComponent},
    { path: 'editarTratamiento', component: FormTratamientosComponent},
    { path: 'crearMedico', component: FormMedicosComponent},
    { path: 'editarMedico', component: FormMedicosComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
