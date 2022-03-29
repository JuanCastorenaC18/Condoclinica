import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Especialidad } from 'src/app/shared/models/especialidades.interface';
import { InterEspecialidad } from '../../interfaces/especialidad';

@Component({
  selector: 'app-form-especialidades',
  templateUrl: './form-especialidades.component.html',
  styleUrls: ['./form-especialidades.component.scss']
})
export class FormEspecialidadesComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  especialidadForm!: FormGroup;
  crearespecialidadform: FormGroup;
  Especialidads: any[] = [];
  Especialidadi!:InterEspecialidad;

  constructor(public fb:FormBuilder,private Svesp:EspecialidadesService,private router:Router,private snackBar:MatSnackBar) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
    })
    this.crearespecialidadform = new FormGroup({
      'nombre': new FormControl('', [
        Validators.required
      ]),
      'cotizacion': new FormControl('', [
        Validators.required
      ]),
      'descripcion': new FormControl('', [
        Validators.required
      ]),
    })
    this.createForm();
  }

  ngOnInit(): void {

  }

  agregar():void{
    if(this.especialidadForm.invalid){
      return Object.values(this.especialidadForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setEspecialidad();
      this.Svesp.create(this.Especialidadi).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        
      })
    }
    this.regresar()
  }
  setEspecialidad():void{
    this.Especialidadi = {
      nombre: this.especialidadForm.get('nombre')?.value
    }
  }

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
    this.especialidadForm = this.fb.group({
      nombre:['']
    })
  }

  regresar(){
    this.router.navigate(['admin/especialidades'])
  }

  cargarEdit(data:Especialidad){
    this.form.value.nombre = data.nombre
  }

}
