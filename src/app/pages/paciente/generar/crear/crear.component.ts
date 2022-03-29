import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitasService } from 'src/app/services/citas.service';
import { Cita } from 'src/app/shared/models/citas.interface';
import { InterCitas } from 'src/app/pages/admin/components/interfaces/cita';
import { Subscription } from 'rxjs';
import { MedicosService } from 'src/app/services/medicos.service';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  citaForm!: FormGroup;
  crearcitaform: FormGroup;
  Citas: any[] = [];
  medicos:any;
  pacientes:any;
  clinicas:any;
  data:any[]=[];
  Citai!:InterCitas;
  suscription!:Subscription;

  constructor(
    public fb:FormBuilder,
    private Svcita:CitasService,
    private Svmed:MedicosService,
    private Svpac:PacientesService,
    private Svcli:ClinicasService,
    private router:Router,
    private snackBar:MatSnackBar
  ) {
    this.form = this.fb.group({
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      medico: ['', [Validators.required]],
      paciente: ['', [Validators.required]],
      clinica: ['', [Validators.required]],
    })

    this.crearcitaform = new FormGroup({
      'fecha': new FormControl('', [
        Validators.required
      ]),
      'hora': new FormControl('', [
        Validators.required
      ]),
      'medico': new FormControl('', [
        Validators.required
      ]),
      'paciente': new FormControl('', [
        Validators.required
      ]),
      'clinica': new FormControl('', [
        Validators.required
      ]),
    })
    this.createForm();
  }

  ngOnInit(): void {
    this.Svcita.get().subscribe((data: any)=>{
      this.Citas = data;
    })
    this.getCitas();
    this.getPaciente();
    this.getMedico();
    this.getClinica();
    this.suscription = this.Svcita.refresh$.subscribe(()=>{
      this.getCitas();
    })
  }

  getCitas(): void{
    this.Svcita.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getMedico(): void{
    this.Svmed.get().subscribe((data:any)=>{
      this.medicos = data
    })
    console.log(this.medicos)
  }

  getPaciente(): void{
    this.Svpac.get().subscribe((data:any)=>{
      this.pacientes = data
    })
    console.log(this.pacientes)
  }

  getClinica(): void{
    this.Svcli.get().subscribe((data:any)=>{
      this.clinicas = data
    })
    console.log(this.clinicas)
  }

  agregar():void{
    if(this.citaForm.invalid){
      return Object.values(this.citaForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setCita();
      this.Svcita.create(this.Citai).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
      })
    }
  }

  setCita():void{
    this.Citai = {
      fecha: this.citaForm.get('fecha')?.value,
      hora: this.citaForm.get('hora')?.value,
      medico: this.citaForm.get('medico')?.value,
      paciente: this.citaForm.get('paciente')?.value,
      clinica: this.citaForm.get('especialidad')?.value
    }
  }

  edit():void{
    if(this.citaForm.invalid){
      return Object.values(this.citaForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.setCita();
      this.Svcita.update(this.Citai).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        /*timeMessage('Updating...', 1500).then(()=>{
          successDialog('Update completado');
        })*/
      })
    }
  }

  /*agregar(){
    if(this.form.valid){
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
    this.citaForm = this.fb.group({
      fecha:["2022-03-29"],
      hora:['10:00:00'],
      medico:[0],
      paciente:[0],
      clinica:[0]
    })
  }

  regresar(){
    this.router.navigate(['admin/citas'])

  }

  cargarEdit(data:Cita){
    this.form.value.fecha = data.fecha
    this.form.value.hora = data.hora
    this.form.value.medico = data.medico
    this.form.value.paciente = data.paciente
    this.form.value.clinica = data.clinica
  }

}
