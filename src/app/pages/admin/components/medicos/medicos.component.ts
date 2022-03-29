import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Medico, Medicos } from 'src/app/shared/models/medicos.interface';
import { MedicosService } from 'src/app/services/medicos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterMedico } from '../interfaces/medico';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { UsersService } from 'src/app/services/users.service';

export interface data {
  id_medico:number,
  nombre:string,
  telefono: string,
  edad:number,
  sexo: string,
  especialidad: number,
  usuario: number
}

/*const medicos:Medicos[] = [
  {cedula:1, nombre:'asdas', telefono:'456456', edad:23, sexo:'F', especialidad:'asdasd', usuario:'asdasd'},
  {cedula:2, nombre:'sdf', telefono:'67867867', edad:23, sexo:'M', especialidad:'asdas', usuario:'asdasd'},
  {cedula:3, nombre:'sdf', telefono:'456456', edad:23, sexo:'M', especialidad:'asdasd', usuario:'asdas'},
  {cedula:4, nombre:'dfgd', telefono:'678678', edad:23, sexo:'M', especialidad:'asdasd', usuario:'sdfsd'},
  {cedula:5, nombre:'dfg', telefono:'353', edad:23, sexo:'F', especialidad:'asdasd', usuario:'sdf'},
  {cedula:6, nombre:'asd', telefono:'678687', edad:23, sexo:'F', especialidad:'asdasd', usuario:'ert'},
  {cedula:7, nombre:'sdfsdf', telefono:'78978', edad:23, sexo:'F', especialidad:'asdasd', usuario:'yu'},
  {cedula:8, nombre:'dfg', telefono:'78979', edad:23, sexo:'M', especialidad:'asdas', usuario:'gjh'},
  {cedula:9, nombre:'fgh', telefono:'78979', edad:23, sexo:'M', especialidad:'sdasd', usuario:'ghj'},
  {cedula:10, nombre:'gh', telefono:'8797897', edad:23, sexo:'M', especialidad:'asda', usuario:'aq'},
]*/

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  crearMedicoform: FormGroup;
  //usersForm: FormGroup;
  Medico: any[] = [];
  especialidades:any;
  users:any;
  data:any[] = [];
  Medicoi!:InterMedico;
  suscription!:Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor
  (
    private Svmed: MedicosService,
    private Svesp: EspecialidadesService,
    private Svuser: UsersService,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private router:Router
  )
  {
    this.crearMedicoform = new FormGroup({
      'nombre': new FormControl('', [
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
      'especialidad': new FormControl('', [
        Validators.required
      ]),
      'usuario': new FormControl('', [
        Validators.required
      ]),
    });
  }

  displayedColumns: string[] = ['id_medico', 'nombre', 'telefono', 'edad', 'sexo', 'especialidad', 'email','acciones'];
  dataSource = new MatTableDataSource(this.data);

  ngOnInit(): void {
    //this.cargarData()
    this.Svmed.get().subscribe((data: any)=>{
      this.Medico = data;
    })
    this.getMedico();
    this.getEspecialidad();
    this.getUser();
    this.suscription = this.Svuser.refresh$.subscribe(()=>{
      this.getMedico();
    })
  }

  getMedico(): void{
    this.Svmed.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getEspecialidad(): void{
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

  eliminar(id:Number):void {
    this.Svmed.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.Svmed.get()
  }
  cargarData(){
    const data:any = this.Svmed.get()
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
    //this.cli.dropClinica(id)
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
    this.router.navigate(['admin/editarMedico'])
    console.log(data)
  }

}
