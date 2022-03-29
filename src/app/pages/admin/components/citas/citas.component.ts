import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Aseguradoras } from 'src/app/shared/models/aseguradora.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
import { Time } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterCitas } from '../interfaces/cita';
import { MedicosService } from 'src/app/services/medicos.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ClinicasService } from 'src/app/services/clinicas.service';

export interface data {
  id_cita:number,
  fecha:string,
  hora:Time,
  medico:number,
  paciente:number,
  clinica:number
}

/*const Citas:data[] = [
  {id_cita:1, fecha:'12-03-2022', medico:'Agustin', paciente:'Rufino', clinica:'General #45'},
  {id_cita:2, fecha:'11-04-2022', medico:'Angelica', paciente:'Fernando',clinica:'General #35'},
  {id_cita:3, fecha:'07-02-2022', medico:'Sebastian', paciente:'Ricardo',clinica:'#65'},
  {id_cita:4, fecha:'02-05-2022', medico:'Agustin', paciente:'Jaziel',clinica:'Condomedics'},
  {id_cita:5, fecha:'29-07-2022', medico:'David', paciente:'Fabian',clinica:'IMMS'},
  {id_cita:6, fecha:'10-02-2022', medico:'Angel', paciente:'America',clinica:'ISSSTE'},
  {id_cita:7, fecha:'10-04-2022', medico:'Jose', paciente:'Elena',clinica:'ISSTE'},
  {id_cita:8, fecha:'19-07-2022', medico:'Danna', paciente:'Ana Paola',clinica:'General #35'},
  {id_cita:9, fecha:'25-02-2022', medico:'Paola', paciente:'Guadalupe',clinica:'Condomedics'},
  {id_cita:10, fecha:'27-05-2022', medico:'Leonardo', paciente:'Maria',clinica:'Condoclinica'},
]*/

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  crearCitaform: FormGroup;
  //usersForm: FormGroup;
  Cita: any[] = [];
  medicos:any;
  pacientes:any;
  clinicas:any;
  data:any[] = [];
  Citasi!:InterCitas;
  suscription!:Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor
  (
    private Svcita: CitasService,
    private Svmed: MedicosService,
    private Svpac: PacientesService,
    private Svcli: ClinicasService,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private router:Router
  )
  {
    this.crearCitaform = new FormGroup({
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
    });
  }

  displayedColumns: string[] = ['id_cita', 'fecha', 'hora', 'medico', 'paciente', 'clinica','acciones'];
  dataSource = new MatTableDataSource(this.data);

  ngOnInit(): void {
    //this.cargarData()
    this.Svcita.get().subscribe((data: any)=>{
      this.Cita = data;
    })
    this.getCita();
    this.getMedico();
    this.getPaciente();
    this.getClinica();
    this.suscription = this.Svcita.refresh$.subscribe(()=>{
      this.getCita();
    })
  }

  getCita(): void{
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

  eliminar(id:Number):void {
    this.Svcita.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.Svcita.get()
  }

  cargarData(){
    const data:any = this.Svcita.get()
    //this.dataSource = new MatTableDataSource(data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: any | Sort | undefined) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*eliminar(id:any){
    //this.cita.dropCita(id)
    //this.cargarData()
    console.log(id)
    this.mensajeExito()
  }*/

  mensajeExito(){
    this.snackBar.open('Registro eliminado correctamente','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }

  editar(data:any){
    this.router.navigate(['admin/editarCita'])
    console.log(data)
  }

}
