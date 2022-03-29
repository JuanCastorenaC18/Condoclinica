import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Especialidad, Especialidades } from 'src/app/shared/models/especialidades.interface';
import { EspecialidadesService } from 'src/app/services/especialidades.service';


export interface data {
  id_especialidad:number,
  nombre:string,
}
/*const especialidades:Especialidades[] = [
  {id_especialidad:1, nombre:'asdas'},
  {id_especialidad:2, nombre:'sdf'},
  {id_especialidad:3, nombre:'sdf'},
  {id_especialidad:4, nombre:'dfgd'},
  {id_especialidad:5, nombre:'dfg'},
  {id_especialidad:6, nombre:'asd'},
  {id_especialidad:7, nombre:'sdfsdf'},
  {id_especialidad:8, nombre:'dfg'},
  {id_especialidad:9, nombre:'fgh'},
  {id_especialidad:10, nombre:'gh'},
]*/

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {
  //crearaseguradoraform: FormGroup;
  Especialidad: any[] = [];
  data:any[] = [];
  //dataSource:any[]=[];
  suscription!:Subscription;

  displayedColumns: string[] = ['id_especialidad', 'nombre','acciones'];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private Svesp: EspecialidadesService,private _liveAnnouncer: LiveAnnouncer,private snackBar: MatSnackBar,private router:Router){}

  ngOnInit(): void {
    //this.cargarData()
    this.Svesp.get().subscribe((data: any)=>{
      this.Especialidad = data;
    })
    this.getEspecialidad();
    this.suscription = this.Svesp.refresh$.subscribe(()=>{
      this.getEspecialidad();
    })
  }

  getEspecialidad(): void{
    this.Svesp.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  eliminar(id:Number):void {
    this.Svesp.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.Svesp.get()
  }

  cargarData(){
    const data:any = this.Svesp.get()
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
    this.router.navigate(['admin/editarEspecialidad'])
    console.log(data)
  }

}
