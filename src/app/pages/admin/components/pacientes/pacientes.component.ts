import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Pacientes } from 'src/app/shared/models/pacientes.interface';
import { PacientesService } from 'src/app/services/pacientes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterPaciente } from '../interfaces/paciente';
import { AseguradoraService } from 'src/app/services/aseguradora.service';
import { UsersService } from 'src/app/services/users.service';

export interface data {
  id_paciente:number,
  nombre:string,
  nss:string,
  telefono: string,
  edad:number,
  sexo: string,
  aseguradora: number,
  usuario: number
}

/*const pacientes:Pacientes[] = [
  {id_paciente:1, nss:'123dgdf', nombre:'asdas', telefono:'456456', edad:23, sexo:'F', aseguradora:'asdasd', usuario:'asdasd'},
  {id_paciente:2, nss:'12445fdg', nombre:'sdf', telefono:'67867867', edad:23, sexo:'M', aseguradora:'asdas', usuario:'asdasd'},
  {id_paciente:3, nss:'dfg5r', nombre:'sdf', telefono:'456456', edad:23, sexo:'M', aseguradora:'asdasd', usuario:'asdas'},
  {id_paciente:4, nss:'sfd456', nombre:'dfgd', telefono:'678678', edad:23, sexo:'M', aseguradora:'asdasd', usuario:'sdfsd'},
  {id_paciente:5, nss:'sdfk67', nombre:'dfg', telefono:'353', edad:23, sexo:'F', aseguradora:'asdasd', usuario:'sdf'},
  {id_paciente:6, nss:'hj678', nombre:'asd', telefono:'678687', edad:23, sexo:'F', aseguradora:'asdasd', usuario:'ert'},
  {id_paciente:7, nss:'cvb45', nombre:'sdfsdf', telefono:'78978', edad:23, sexo:'F', aseguradora:'asdasd', usuario:'yu'},
  {id_paciente:8, nss:'zx435', nombre:'dfg', telefono:'78979', edad:23, sexo:'M', aseguradora:'asdas', usuario:'gjh'},
  {id_paciente:9, nss:'90', nombre:'fgh', telefono:'78979', edad:23, sexo:'M', aseguradora:'sdasd', usuario:'ghj'},
  {id_paciente:10, nss:'123fdgddgdf', nombre:'gh', telefono:'8797897', edad:23, sexo:'M', aseguradora:'asda', usuario:'aq'},
]*/

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  crearPacienteform: FormGroup;
  //usersForm: FormGroup;
  Pacientes: any[] = [];
  aseguradoras:any;
  users:any;
  data:any[] = [];
  Paciente!:InterPaciente;
  suscription!:Subscription;

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private Svpac: PacientesService, private Svase:AseguradoraService, private Svuser:UsersService, private _liveAnnouncer: LiveAnnouncer,private snackBar: MatSnackBar,private router:Router)
  {
    this.crearPacienteform = new FormGroup({
      'nss': new FormControl('', [
        Validators.required
      ]),
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
      'aseguradora': new FormControl('', [
        Validators.required
      ]),
      'usuario': new FormControl('', [
        Validators.required
      ]),
    });
  }

  displayedColumns: string[] = ['id_paciente', 'nss','nombre', 'telefono', 'edad', 'sexo', 'aseguradora', 'email','acciones'];
  dataSource = new MatTableDataSource(this.data);

  ngOnInit(): void {
    //this.cargarData()
    this.Svpac.get().subscribe((data: any)=>{
      this.Pacientes = data;
    })
    this.getPacientes();
    this.getAseguradora();
    this.getUser();
    this.suscription = this.Svuser.refresh$.subscribe(()=>{
      this.getPacientes();
    })
  }

  getPacientes(): void{
    this.Svpac.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getAseguradora(): void{
    this.Svase.getaseguradora().subscribe((data:any)=>{
      this.aseguradoras = data
    })
    console.log(this.aseguradoras)
  }

  getUser(): void{
    this.Svuser.get().subscribe((data:any)=>{
      this.users = data
    })
    console.log(this.users)
  }

  eliminar(id:Number):void {
    this.Svpac.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.Svpac.get()
  }

  cargarData(){
    const data:any = this.Svpac.get()
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
    this.router.navigate(['admin/editarPacientes'])
    console.log(data)
  }

}
