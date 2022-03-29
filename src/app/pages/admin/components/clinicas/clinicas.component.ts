import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { InterUser } from '../interfaces/user';

export interface data {
  id_cli:number,
  nombre:string,
  telefono:string,
  direccion:string,
}

/*const Clinica:data[] = [
  {id_cli:1, nombre:'General #45', telefono:'8711345769', direccion:'La cepeda'},
  {id_cli:2, nombre:'IMMS', telefono:'8712978567', direccion:'Roman'},
  {id_cli:3, nombre:'ISSSTE', telefono:'8713260790', direccion:'Zaragoza'},
  {id_cli:4, nombre:'#65', telefono:'8710658997', direccion:'Rivera'},
  {id_cli:5, nombre:'Condomedics', telefono:'8733067355', direccion:'Colon'},
  {id_cli:6, nombre:'Condo clinica', telefono:'8711220566', direccion:'Americas'},
  {id_cli:7, nombre:'Clinica segura', telefono:'8711332966', direccion:'Elenco'},
  {id_cli:8, nombre:'Administrativa', telefono:'8710658454', direccion:'Venustiano'},
  {id_cli:9, nombre:'La segura', telefono:'8719783456', direccion:'La zona'},
  {id_cli:10, nombre:'Emergencia+', telefono:'8711005069', direccion:'Direccion'},
]*/

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styleUrls: ['./clinicas.component.scss']
})
export class ClinicasComponent implements OnInit {
  Clinica: any[] = [];
  data:any[] = [];
  //dataSource:any[]=[];
  suscription!:Subscription;

  displayedColumns: string[] = ['id_cli', 'nombre', 'telefono', 'direccion','acciones'];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cliSvc: ClinicasService,private _liveAnnouncer: LiveAnnouncer,private snackBar: MatSnackBar,private router:Router){}

  ngOnInit(): void {
    //this.cargarData()
    this.getClinica();
    this.suscription = this.cliSvc.refresh$.subscribe(()=>{
      this.getClinica();
    })
  }

  getClinica(): void{
    this.cliSvc.get().subscribe((data: any)=>{
      this.data = data;
    })
  }
  cargarData(){
    //const data:any = this.cli.getDataClinica()
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

  eliminar(id:Number):void {
    this.cliSvc.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.cliSvc.get()
  }
  


  mensajeExito(){
    this.snackBar.open('Registro eliminado correctamente','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }

  editar(data:any){
    this.router.navigate(['admin/editarClinica'])
    console.log(data)
  }

}
