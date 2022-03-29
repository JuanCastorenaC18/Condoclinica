import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicosService } from 'src/app/services/medicos.service';
import { Medico } from 'src/app/shared/models/medicos.interface';
import { InterMedico } from '../../interfaces/medico';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';

@Component({
  selector: 'app-form-medicos',
  templateUrl: './form-medicos.component.html',
  styleUrls: ['./form-medicos.component.scss']
})
export class FormMedicosComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  medicoForm!: FormGroup;
  crearmedicoform: FormGroup;
  Medicos: any[] = [];
  especialidades:any;
  users:any;
  data:any[]=[];
  Medicoi!:InterMedico;
  suscription!:Subscription;

  constructor(
    public fb:FormBuilder,
    private SVmed:MedicosService,
    private Svuser:UsersService,
    private Svesp:EspecialidadesService,
    private router:Router,
    private snackBar:MatSnackBar) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
    })

    this.crearmedicoform = new FormGroup({
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
    this.SVmed.get().subscribe((data: any)=>{
      this.Medicos = data;
    })
    this.getMedicos();
    this.getAseguradora();
    this.getUser();
    this.suscription = this.SVmed.refresh$.subscribe(()=>{
      this.getMedicos();
    })
  }

  getMedicos(): void{
    this.SVmed.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getAseguradora(): void{
    this.Svesp.get().subscribe((data:any)=>{
      this.especialidades = data
    })
    console.log(this.especialidades)
  }

  getUser(): void{
    this.Svuser.get().subscribe((data:any)=>{
      this.users = data
    })
    console.log(this.users)
  }

  agregar():void{
    if(this.medicoForm.invalid){
      return Object.values(this.medicoForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setMedico();
      this.Svesp.create(this.Medicoi).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
      })
    }
  }

  setMedico():void{
    this.Medicoi = {
      nombre: this.medicoForm.get('nombre')?.value,
      telefono: this.medicoForm.get('telefono')?.value,
      edad: this.medicoForm.get('edad')?.value,
      sexo: this.medicoForm.get('sexo')?.value,
      especialidad: this.medicoForm.get('especialidad')?.value,
      usuario: this.medicoForm.get('usuario')?.value
    }
  }

  edit():void{
    if(this.medicoForm.invalid){
      return Object.values(this.medicoForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.setMedico();
      this.SVmed.update(this.Medicoi).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        /*timeMessage('Updating...', 1500).then(()=>{
          successDialog('Update completado');
        })*/
      })
    }
  }

  /*agregar(){
    const medico:Medico = {
      nombre: this.form.value.nombre,
      telefono: this.form.value.nombre,
      edad: this.form.value.nombre,
      sexo: this.form.value.nombre,
      especialidad: this.form.value.nombre,
      usuario: this.form.value.nombre,
    }
    console.log(medico)
    //this.ase.createAse(aseguradora)
    this.router.navigate(['admin/medicos'])
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
    this.medicoForm = this.fb.group({
      nombre:[''],
      telefono:[''],
      edad:[''],
      sexo:[''],
      especialidad:[0],
      usuario:[0]
    })
  }

  regresar(){
    this.router.navigate(['admin/medicos'])
  }

  cargarEdit(data:Medico){
    this.form.value.nombre = data.nombre
    this.form.value.telefono = data.telefono
    this.form.value.edad = data.edad
    this.form.value.sexo = data.sexo
    this.form.value.especialidad = data.especialidad
    this.form.value.usuario = data.usuario
  }

}
