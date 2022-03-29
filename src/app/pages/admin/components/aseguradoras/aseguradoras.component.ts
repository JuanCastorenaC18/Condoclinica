import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Aseguradoras } from 'src/app/shared/models/aseguradora.interface';
import { AseguradoraService } from 'src/app/services/aseguradora.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

export interface data {
  id_aseguradora:number,
  nombre:string,
  cotizacion:number,
  descripcion:string
}

/*const Aseguradora:data[] = [
  {id_aseguradora:1, nombre:'Inbursa', cotizacion:123565, descripcion:'Es muy bueno'},
  {id_aseguradora:2, nombre:'General', cotizacion:345534, descripcion:'Eso es excelente'},
  {id_aseguradora:3, nombre:'Asisa', cotizacion:123576565, descripcion:'Excelente'},
  {id_aseguradora:4, nombre:'Esado', cotizacion:789789, descripcion:'Pesimo'},
  {id_aseguradora:5, nombre:'Misa', cotizacion:809, descripcion:'Genial'},
  {id_aseguradora:6, nombre:'Basa', cotizacion:234, descripcion:'Chido'},
  {id_aseguradora:7, nombre:'Lesa', cotizacion:678, descripcion:'yeah'},
  {id_aseguradora:8, nombre:'Fazo', cotizacion:12, descripcion:'si'},
  {id_aseguradora:9, nombre:'Onza', cotizacion:345, descripcion:'no'},
  {id_aseguradora:10, nombre:'Lenza', cotizacion:687, descripcion:'Es muy bueno'},
]*/

@Component({
  selector: 'app-aseguradoras',
  templateUrl: './aseguradoras.component.html',
  styleUrls: ['./aseguradoras.component.scss']
})
export class AseguradorasComponent implements OnInit, AfterViewInit {
  //crearaseguradoraform: FormGroup;
  Aseguradora: any[] = [];
  data:any[] = [];
  //dataSource:any[]=[];
  suscription!:Subscription;


  displayedColumns: string[] = ['id_aseguradora', 'nombre', 'cotizacion', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private asSvc: AseguradoraService,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private router:Router){}

  /*ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }*/

  ngOnInit(): void {
    //this.cargarData()
    this.asSvc.get().subscribe((data: any)=>{
      this.Aseguradora = data;
    })
    this.getAseguradora();
    this.suscription = this.asSvc.refresh$.subscribe(()=>{
      this.getAseguradora();
    })
  }

  getAseguradora(): void{
    this.asSvc.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  /*cargarData(){
    const this.data:any = this.asSvc.getDataAse()
    //this.dataSource = new MatTableDataSource(data);
  }*/

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
    //this.asSvc.dropAse(id)
    //this.cargarData()
    console.log(id)
    this.mensajeExito()
  }*/
  eliminar(id:Number):void {
    this.asSvc.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.asSvc.get()
  }

  mensajeExito(){
    this.snackBar.open('Registro eliminado correctamente','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }

  editar(data:any){
    this.router.navigate(['admin/editarAseguradora'])
    console.log(data)
  }

}
function cargarData(): ((error: any) => void) | null | undefined {
  throw new Error('Function not implemented.');
}

