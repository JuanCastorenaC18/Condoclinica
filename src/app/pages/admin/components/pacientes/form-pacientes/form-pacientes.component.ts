import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Paciente } from 'src/app/shared/models/pacientes.interface';
import { InterPaciente } from '../../interfaces/paciente';
import { Subscription } from 'rxjs';
import { AseguradoraService } from 'src/app/services/aseguradora.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form-pacientes',
  templateUrl: './form-pacientes.component.html',
  styleUrls: ['./form-pacientes.component.scss']
})
export class FormPacientesComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  pacienteForm!: FormGroup;
  crearpacienteform: FormGroup;
  Pacientes: any[] = [];
  aseguradoras:any;
  users:any;
  data:any[]=[];
  Pacientei!:InterPaciente;
  suscription!:Subscription;

  constructor(public fb:FormBuilder, private Svpac:PacientesService, private Svase:AseguradoraService, private Svuser:UsersService , private router:Router,private snackBar:MatSnackBar)
   {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      nss: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      aseguradora: ['', [Validators.required]],
      email: ['', [Validators.required]],
    })

    this.crearpacienteform = new FormGroup({
      'nombre': new FormControl('', [
        Validators.required
      ]),
      'nss': new FormControl('', [
        Validators.required
      ]),
      'telefono': new FormControl('', [
        Validators.required
      ]),
      'edad': new FormControl('', [
        Validators.required
      ]),
      'sexo': new FormControl('', [
        Validators.required
      ]),
      'aseguradora': new FormControl('', [
        Validators.required
      ]),
      'usuario': new FormControl('', [
        Validators.required
      ]),
    })
    this.createForm();
  }

  ngOnInit(): void {
    this.Svpac.get().subscribe((data: any)=>{
      this.Pacientes = data;
    })
    this.getPacientes();
    this.getAseguradora();
    this.getUser();
    this.suscription = this.Svpac.refresh$.subscribe(()=>{
      this.getPacientes();
    })
  }

  getPacientes(): void{
    this.Svpac.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getAseguradora(): void{
    this.Svase.getaseguradora().subscribe((data:any)=>{
      this.aseguradoras = data
    })
    console.log(this.aseguradoras)
  }

  getUser(): void{
    this.Svuser.get().subscribe((data:any)=>{
      this.users = data
    })
    console.log(this.users)
  }

  agregar():void{
    if(this.pacienteForm.invalid){
      return Object.values(this.pacienteForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setPaciente();
      this.Svpac.create(this.Pacientei).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
      })
    }
  }

  setPaciente():void{
    this.Pacientei = {
      nombre: this.pacienteForm.get('nombre')?.value,
      nss: this.pacienteForm.get('nss')?.value,
      telefono: this.pacienteForm.get('telefono')?.value,
      edad: this.pacienteForm.get('edad')?.value,
      sexo: this.pacienteForm.get('sexo')?.value,
      aseguradora: this.pacienteForm.get('aseguradora')?.value,
      usuario: this.pacienteForm.get('usuario')?.value
    }
  }

  edit():void{
    if(this.pacienteForm.invalid){
      return Object.values(this.pacienteForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.setPaciente();
      this.Svpac.update(this.Pacientei).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        /*timeMessage('Updating...', 1500).then(()=>{
          successDialog('Update completado');
        })*/
      })
    }
  }

  /*agregar(){
    const paciente:Paciente = {
      nombre: this.form.value.nombre,
      nss: this.form.value.nss,
      telefono: this.form.value.nombre,
      edad: this.form.value.nombre,
      sexo: this.form.value.nombre,
      aseguradora: this.form.value.aseguradora,
      usuario: this.form.value.nombre,
    }
    console.log(paciente)
    //this.ase.createAse(aseguradora)
    this.router.navigate(['admin/pacientes'])
    this.mensajeExito()
  }*/

  mensajeExito(){
    this.snackBar.open('Registro ingresado correctamente','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }

  isValidField(field:string): boolean | any{
    return(
      (this.form.get(field)?.touched || this.form.get(field)?.dirty) && !this.form.get(field)?.valid
    )
  }

  getErrorMessage(field:string):string | any{
    let message
    if (this.form.get(field)?.errors?.["required"])
    {
      message = 'Debes ingresar un valor'
    }
    return message
  }

  createForm(): void {
    this.pacienteForm = this.fb.group({
      nombre:[''],
      nss:[''],
      telefono:[''],
      edad:[''],
      sexo:[''],
      aseguradora:[0],
      usuario:[0]
    })
  }

  regresar(){
    this.router.navigate(['admin/pacientes'])
  }

  cargarEdit(data:Paciente){
    this.form.value.nombre = data.nombre
    this.form.value.nss = data.nss
    this.form.value.telefono = data.telefono
    this.form.value.edad = data.edad
    this.form.value.sexo = data.sexo
    this.form.value.aseguradora = data.aseguradora
    this.form.value.usuario = data.usuario
  }

}
