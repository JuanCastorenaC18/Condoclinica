import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Consulta, Consultas } from 'src/app/shared/models/consultas.interface';

@Component({
  selector: 'app-form-consultas',
  templateUrl: './form-consultas.component.html',
  styleUrls: ['./form-consultas.component.scss']
})
export class FormConsultasComponent implements OnInit {

  public form:FormGroup
  isValid:any;

  constructor(
    public fb:FormBuilder,
    private con:ConsultasService,
    private router:Router,
    private snackBar:MatSnackBar
  ) {
    this.form = this.fb.group({
      sintomas: ['', [Validators.required]],
      tratamiento: ['', [Validators.required]],
      cita: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

  }

  agregar(){
    const consulta:Consulta = {
      sintomas: this.form.value.sintomas,
      tratamiento: this.form.value.tratamiento,
      cita: this.form.value.cita,
    }
    console.log(consulta)
    //this.ase.createAse(aseguradora)
    this.router.navigate(['admin/consultas'])
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
    this.router.navigate(['admin/consultas'])
  }

  cargarEdit(data:Consulta){
    this.form.value.sintomas = data.sintomas
    this.form.value.tratamiento = data.tratamiento
    this.form.value.cita = data.cita
  }

}
