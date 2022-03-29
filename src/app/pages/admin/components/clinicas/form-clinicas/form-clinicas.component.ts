import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { errorMessage, successDialog, timeMessage } from 'src/app/assets/alerts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { Clinica } from 'src/app/shared/models/clinica.interface';
import { InterClinica } from '../../interfaces/clinica';

@Component({
  selector: 'app-form-clinicas',
  templateUrl: './form-clinicas.component.html',
  styleUrls: ['./form-clinicas.component.scss']
})
export class FormClinicasComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  clinicaForm!: FormGroup;
  crearclinicaform: FormGroup;
  clinicas: any[] = [];
  Clinicai!:InterClinica;

  constructor(public fb:FormBuilder,private Svcli:ClinicasService,private router:Router,private snackBar:MatSnackBar) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    })

    this.crearclinicaform = new FormGroup({
      'nombre': new FormControl('', [
        Validators.required
      ]),
      'telefono': new FormControl('', [
        Validators.required
      ]),
      'direccion': new FormControl('', [
        Validators.required
      ]),
    })
    this.createForm();
  }

  ngOnInit(): void {

  }

  /*agregar(){
    const clinica:Clinica = {
      nombre: this.form.value.nombre,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
    }
    console.log(clinica)
    //this.ase.createAse(aseguradora)
    this.router.navigate(['admin/clinicas'])
    this.mensajeExito()
  }*/

  agregar():void{
    if(this.clinicaForm.invalid){
      return Object.values(this.clinicaForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setClinica();
      this.Svcli.create(this.Clinicai).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
      })
    }
  }

  setClinica():void{
    this.Clinicai = {
      nombre: this.clinicaForm.get('nombre')?.value,
      telefono: this.clinicaForm.get('telefono')?.value,
      direccion: this.clinicaForm.get('direccion')?.value
    }
  }

  edit():void{
    if(this.clinicaForm.invalid){
      return Object.values(this.clinicaForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.setClinica();
      this.Svcli.update(this.Clinicai).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        /*timeMessage('Updating...', 1500).then(()=>{
          successDialog('Update completado');
        })*/
      })
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
    this.clinicaForm = this.fb.group({
      nombre:[''],
      telefono:[''],
      direccion:['']
    })
  }

  regresar(){
    this.router.navigate(['admin/clinicas'])
  }

  cargarEdit(data:Clinica){
    this.form.value.nombre = data.nombre
    this.form.value.telefono = data.telefono
    this.form.value.direccion = data.direccion
  }

}
function successDialog(arg0: string) {
  throw new Error('Function not implemented.');
}

function timeMessage(arg0: string, arg1: number) {
  throw new Error('Function not implemented.');
}

function errorMessage(arg0: string) {
  throw new Error('Function not implemented.');
}

