import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AseguradoraService } from 'src/app/services/aseguradora.service';
import { Aseguradora, Aseguradoras } from 'src/app/shared/models/aseguradora.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterAseguradoras } from '../../interfaces/aseguradora';

@Component({
  selector: 'app-form-aseguradora',
  templateUrl: './form-aseguradora.component.html',
  styleUrls: ['./form-aseguradora.component.scss']
})
export class FormAseguradoraComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  aseguradoraForm!: FormGroup;
  crearaseguradoraform: FormGroup;
  Aseguradoras: any[] = [];
  Aseguradorai!:InterAseguradoras;

  constructor(public fb:FormBuilder,private asSvc:AseguradoraService,private router:Router,private snackBar:MatSnackBar) 
  {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      cotizacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })

    this.crearaseguradoraform = new FormGroup({
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

  /*agregar(){
    const aseguradora:Aseguradora = {
      nombre: this.form.value.nombre,
      cotizacion: this.form.value.cotizacion,
      descripcion: this.form.value.descripcion,
    }
    console.log(aseguradora)
    //this.ase.createAse(aseguradora)
    this.router.navigate(['admin/aseguradoras'])
    this.mensajeExito()
  }*/

  agregar():void{
    if(this.aseguradoraForm.invalid){
      return Object.values(this.aseguradoraForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setAseguradora();
      this.asSvc.addase(this.Aseguradorai).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        
      })
    }
    this.regresar()
  }
  setAseguradora():void{
    this.Aseguradorai = {
      nombre: this.aseguradoraForm.get('nombre')?.value,
      cotizacion: this.aseguradoraForm.get('cotizacion')?.value,
      descripcion: this.aseguradoraForm.get('descripcion')?.value
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
    this.aseguradoraForm = this.fb.group({
      nombre:[''],
      cotizacion:[0],
      descripcion:['']
    })
  }

  regresar(){
    this.router.navigate(['admin/aseguradoras'])
  }

  cargarEdit(data:Aseguradora){
    this.form.value.nombre = data.nombre
    this.form.value.cotizacion = data.cotizacion
    this.form.value.descripcion = data.descripcion
  }

}
