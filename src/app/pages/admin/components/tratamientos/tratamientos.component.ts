import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Tratamientos } from 'src/app/shared/models/tratamientos.interface';
import { TratamientosService } from 'src/app/services/tratamientos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterTratamiento } from '../interfaces/tratamiento';
import { ConsultasService } from 'src/app/services/consultas.service';

export interface data {
  id_tratamiento:number,
  medicamento:string,
  inicaciones: string
  consultas:number
}

/*const tratamientos:Tratamientos[] = [
  {id_tratamiento:1, medicamento:'123dgdf', indicaciones:'asdas'},
  {id_tratamiento:2, medicamento:'12445fdg', indicaciones:'sdf'},
  {id_tratamiento:3, medicamento:'dfg5r', indicaciones:'sdf'},
  {id_tratamiento:4, medicamento:'sfd456', indicaciones:'dfgd'},
  {id_tratamiento:5, medicamento:'sdfk67', indicaciones:'dfg'},
  {id_tratamiento:6, medicamento:'hj678', indicaciones:'asd'},
  {id_tratamiento:7, medicamento:'cvb45', indicaciones:'sdfsdf'},
  {id_tratamiento:8, medicamento:'zx435', indicaciones:'dfg'},
  {id_tratamiento:9, medicamento:'90', indicaciones:'fgh'},
  {id_tratamiento:10, medicamento:'123fdgddgdf', indicaciones:'gh'},
]*/

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.scss']
})
export class TratamientosComponent implements OnInit {
  crearTratamientosform: FormGroup;
  //usersForm: FormGroup;
  Tratamientos: any[] = [];
  consultas:any;
  data:any[] = [];
  Tratamiento!:InterTratamiento;
  suscription!:Subscription;

  constructor
  (private Svtrata: TratamientosService, private Svconsulta:ConsultasService,private _liveAnnouncer: LiveAnnouncer,private snackBar: MatSnackBar,private router:Router)
  {
    this.crearTratamientosform = new FormGroup({
      'medicamento': new FormControl('', [
        Validators.required
      ]),
      'indicaciones': new FormControl('', [
        Validators.required
      ]),
      'consulta': new FormControl('', [
        Validators.required
      ]),
    });
  }

  displayedColumns: string[] = ['id_tratamiento', 'medicamento','indicaciones', 'consulta','acciones'];
  dataSource = new MatTableDataSource(this.Tratamientos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  ngOnInit(): void {
    //this.cargarData()
    this.Svtrata.get().subscribe((data: any)=>{
      this.Tratamientos = data;
    })
    this.getTratamientos();
    this.getRol();
    this.suscription = this.Svtrata.refresh$.subscribe(()=>{
      this.getTratamientos();
    })
  }

  getTratamientos(): void{
    this.Svtrata.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getRol(): void{
    this.Svconsulta.get().subscribe((data:any)=>{
      this.consultas = data
    })
    console.log(this.consultas)
  }

  eliminar(id:Number):void {
    this.Svtrata.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.Svtrata.get()
  }

  cargarData(){
    const data:any = this.Svtrata.getTratamientos()
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
    this.router.navigate(['admin/editarTratamiento'])
    console.log(data)
  }

}
