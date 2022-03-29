import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';

export interface myCita {
  id_cita:number,
  fecha:string,
  medico:string,
  paciente:string,
  clinica:string
}

const Citas:myCita[] = [
  {id_cita:1, fecha:'12-03-2022', medico:'Agustin', paciente:'Rufino', clinica:'General #45'},
]

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.scss']
})
export class GenerarComponent implements OnInit {

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
    this.router.navigate(['paciente/editarCita'])
    console.log(data)
  }

}
