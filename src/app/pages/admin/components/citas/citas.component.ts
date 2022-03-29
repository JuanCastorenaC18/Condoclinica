import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Aseguradoras } from 'src/app/shared/models/aseguradora.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';

export interface data {
  id_cita:number,
  fecha:string,
  medico:string,
  paciente:string,
  clinica:string
}

const Citas:data[] = [
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
]

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  displayedColumns: string[] = ['id_cita', 'fecha', 'medico', 'paciente', 'clinica','acciones'];
  dataSource = new MatTableDataSource(Citas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor
  (
    private citas: CitasService,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private router:Router
  )
  {

  }

  ngOnInit(): void {
    //this.cargarData()
  }

  cargarData(){
    const data:any = this.citas.getDataCita()
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

  eliminar(id:any){
    //this.cita.dropCita(id)
    //this.cargarData()
    console.log(id)
    this.mensajeExito()
  }

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
