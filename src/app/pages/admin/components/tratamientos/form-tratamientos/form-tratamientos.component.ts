import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TratamientosService } from 'src/app/services/tratamientos.service';
import { Tratamiento } from 'src/app/shared/models/tratamientos.interface';
import { InterTratamiento } from '../../interfaces/tratamiento';
import { Subscription } from 'rxjs';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-form-tratamientos',
  templateUrl: './form-tratamientos.component.html',
  styleUrls: ['./form-tratamientos.component.scss']
})
export class FormTratamientosComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  tratamientoForm!: FormGroup;
  creartratamientoform: FormGroup;
  Tratamientos: any[] = [];
  consultas:any;
  data:any[]=[];
  Tratamientosi!:InterTratamiento;
  suscription!:Subscription;

  constructor(
    public fb:FormBuilder,
    private Svtrata:TratamientosService,
    private Svconsulta: ConsultasService,
    private router:Router,
    private snackBar:MatSnackBar
  ) {
    this.form = this.fb.group({
      medicamento: ['', [Validators.required]],
      indicaciones: ['', [Validators.required]],
      consulta: ['', [Validators.required]],
    })

    this.creartratamientoform = new FormGroup({
      'medicamento': new FormControl('', [
        Validators.required
      ]),
      'indicaciones': new FormControl('', [
        Validators.required
      ]),
      'consulta': new FormControl('', [
        Validators.required
      ]),
    })
    this.createForm();
  }

  ngOnInit(): void {
    this.Svtrata.get().subscribe((data: any)=>{
      this.Tratamientos = data;
    })
    this.getUsers();
    this.getConsulta();
    this.suscription = this.Svtrata.refresh$.subscribe(()=>{
      this.getUsers();
    })
  }

  getUsers(): void{
    this.Svtrata.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getConsulta(): void{
    this.Svconsulta.get().subscribe((data:any)=>{
      this.consultas = data
    })
    console.log(this.consultas)
  }

  agregar():void{
    if(this.tratamientoForm.invalid){
      return Object.values(this.tratamientoForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setClinica();
      this.Svtrata.create(this.Tratamientosi).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
      })
    }
  }

  setClinica():void{
    this.Tratamientosi = {
      medicamento: this.tratamientoForm.get('medicamento')?.value,
      indicaciones: this.tratamientoForm.get('indicaciones')?.value,
      consulta: this.tratamientoForm.get('consulta')?.value
    }
  }

  edit():void{
    if(this.tratamientoForm.invalid){
      return Object.values(this.tratamientoForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.setClinica();
      this.Svtrata.update(this.Tratamientosi).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        /*timeMessage('Updating...', 1500).then(()=>{
          successDialog('Update completado');
        })*/
      })
    }
  }

  /*agregar(){
    const paciente:Tratamiento = {
      medicamento: this.form.value.nombre,
      indicaciones: this.form.value.nss,
    }
    console.log(paciente)
    //this.ase.createAse(aseguradora)
    this.router.navigate(['admin/tratamientos'])
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

  regresar(){
    this.router.navigate(['admin/tratamientos'])
  }

  cargarEdit(data:Tratamiento){
    this.form.value.medicamento = data.medicamento
    this.form.value.indicaciones = data.indicaciones
    this.form.value.consulta = data.consulta
  }

  createForm(): void {
    this.tratamientoForm = this.fb.group({
      medicamento:[''],
      indicaciones:[''],
      consulta:[2]
    })
  }
}
