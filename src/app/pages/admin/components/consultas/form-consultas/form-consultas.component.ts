import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Consulta, Consultas } from 'src/app/shared/models/consultas.interface';
import { InterConsultas } from '../../interfaces/consulta';
import { Subscription } from 'rxjs';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-form-consultas',
  templateUrl: './form-consultas.component.html',
  styleUrls: ['./form-consultas.component.scss']
})
export class FormConsultasComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  consultaForm!: FormGroup;
  crearconsultaform: FormGroup;
  Consulta: any[] = [];
  citas:any;
  data:any[]=[];
  Consultai!:InterConsultas;
  suscription!:Subscription;

  constructor(
    public fb:FormBuilder,
    private Svcon:ConsultasService,
    private Svcita:CitasService,
    private router:Router,
    private snackBar:MatSnackBar
  ) {
    this.form = this.fb.group({
      sintomas: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      cita: ['', [Validators.required]],
    })

    this.crearconsultaform = new FormGroup({
      'sintomas': new FormControl('', [
        Validators.required
      ]),
      'diagnostico': new FormControl('', [
        Validators.required
      ]),
      'cita': new FormControl('', [
        Validators.required
      ]),
    })
    this.createForm();
  }

  ngOnInit(): void {
    this.Svcon.get().subscribe((data: any)=>{
      this.Consulta = data;
    })
    this.getConsulta();
    this.getCitas();
    this.suscription = this.Svcon.refresh$.subscribe(()=>{
      this.getConsulta();
    })
  }

  getConsulta(): void{
    this.Svcon.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getCitas(): void{
    this.Svcita.get().subscribe((data:any)=>{
      this.citas = data
    })
  }

  agregar():void{
    if(this.consultaForm.invalid){
      return Object.values(this.consultaForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setConsulta();
      this.Svcon.create(this.Consultai).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
      })
    }
  }

  setConsulta():void{
    this.Consultai = {
      sintomas: this.consultaForm.get('sintomas')?.value,
      diagnostico: this.consultaForm.get('diagnostico')?.value,
      cita: this.consultaForm.get('cita')?.value
    }
  }

  edit():void{
    if(this.consultaForm.invalid){
      return Object.values(this.consultaForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.setConsulta();
      this.Svcon.update(this.Consultai).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        /*timeMessage('Updating...', 1500).then(()=>{
          successDialog('Update completado');
        })*/
      })
    }
  }

  /*agregar(){
    const consulta:Consulta = {
      sintomas: this.form.value.sintomas,
      tratamiento: this.form.value.tratamiento,
      cita: this.form.value.cita,
    }
    console.log(consulta)
    //this.ase.createAse(aseguradora)
    this.router.navigate(['admin/consultas'])
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
    this.consultaForm = this.fb.group({
      sintomas:[""],
      diagnostico:[''],
      cita:[0]
    })
  }

  regresar(){
    this.router.navigate(['admin/consultas'])
  }

  cargarEdit(data:Consulta){
    this.form.value.sintomas = data.sintomas
    this.form.value.diagnostico = data.diagnostico
    this.form.value.cita = data.cita
  }

}
