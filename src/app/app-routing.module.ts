import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutasGuard } from './guards/rutas.guard';

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate:[RutasGuard]
  },
  {
    path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'paciente', loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule),
    canActivate:[RutasGuard]
  },
  {
     path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
  },
  {
     path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
