import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Consultas } from 'src/app/shared/models/consultas.interface';
import { ConsultasService } from 'src/app/services/consultas.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterConsultas } from '../interfaces/consulta';
import { CitasService } from 'src/app/services/citas.service';

export interface data {
  sintomas: string,
  diagnostico: string,
  cita: number
}


/*const Consulta:Consultas[] = [
  {id_consulta:1, sintomas:'Insomnio', tratamiento:'asdas', cita:1},
  {id_consulta:2, sintomas:'Cansancio', tratamiento:'sdf', cita:3},
  {id_consulta:3, sintomas:'Agotado', tratamiento:'gf', cita:8},
  {id_consulta:4, sintomas:'Diarrea', tratamiento:'dfg', cita:9},
  {id_consulta:5, sintomas:'Diarrea', tratamiento:'hfgh', cita:7},
  {id_consulta:6, sintomas:'Vomito', tratamiento:'asd', cita:6},
  {id_consulta:7, sintomas:'Nauseas segura', tratamiento:'asd', cita:5},
  {id_consulta:8, sintomas:'Dolor', tratamiento:'fgdg', cita:4},
  {id_consulta:9, sintomas:'Fiebre', tratamiento:'as', cita:10},
  {id_consulta:10, sintomas:'Covid', tratamiento:'sg', cita:2},
]*/

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  crearConsultaform: FormGroup;
  //usersForm: FormGroup;
  Consulta: any[] = [];
  citas:any;
  data:any[] = [];
  Consultai!:InterConsultas;
  suscription!:Subscription;

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor
  (
    private Svcon: ConsultasService,
    private Svcita: CitasService,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private router:Router
  )
  {
    this.crearConsultaform = new FormGroup({
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

  displayedColumns: string[] = ['id_consulta', 'sintomas', 'diagnostico', 'cita','acciones'];
  dataSource = new MatTableDataSource(this.data);

  ngOnInit(): void {
    //this.cargarData()
    this.Svcon.get().subscribe((data: any)=>{
      this.Consulta = data;
    })
    this.getConsulta();
    this.getCita();
    this.suscription = this.Svcita.refresh$.subscribe(()=>{
      this.getConsulta();
    })
  }

  getConsulta(): void{
    this.Svcon.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getCita(): void{
    this.Svcita.get().subscribe((data:any)=>{
      this.citas = data
    })
  }

  eliminar(id:Number):void {
    this.Svcon.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.Svcon.get()
  }

  cargarData(){
    const data:any = this.Svcon.get()
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
    this.router.navigate(['admin/editarConsultas'])
    console.log(data)
  }

}
