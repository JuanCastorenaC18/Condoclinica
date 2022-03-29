import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitasService } from 'src/app/services/citas.service';
import { Cita } from 'src/app/shared/models/citas.interface';

@Component({
  selector: 'app-form-citas',
  templateUrl: './form-citas.component.html',
  styleUrls: ['./form-citas.component.scss']
})
export class FormCitasComponent implements OnInit {

  public form:FormGroup
  isValid:any;

  constructor(
    public fb:FormBuilder,
    private cita:CitasService,
    private router:Router,
    private snackBar:MatSnackBar
  ) {
    this.form = this.fb.group({
      fecha: ['', [Validators.required]],
      medico: ['', [Validators.required]],
      paciente: ['', [Validators.required]],
      clinica: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

  }

  agregar(){
    const cita:Cita = {
      fecha: this.form.value.fecha,
      medico: this.form.value.medico,
      paciente: this.form.value.paciente,
      clinica: this.form.value.clinica
    }
    console.log(cita)
    //this.ase.createAse(aseguradora)
    this.router.navigate(['admin/citas'])
    this.mensajeExito()
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

  regresar(){
    this.router.navigate(['admin/citas'])
  }

  cargarEdit(data:Cita){
    this.form.value.fecha = data.fecha
    this.form.value.medico = data.medico
    this.form.value.paciente = data.paciente
    this.form.value.clinica = data.clinica
  }

}
