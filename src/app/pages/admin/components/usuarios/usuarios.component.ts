import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/models/users.interface';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolsService } from 'src/app/services/rols.service';
import { InterUser } from '../interfaces/user';


export interface data {
  id_user:number,
  email:string,
  password: string
  rol:number
}
/*const users:Users[] = [
  {id_user:1, email:'123dgdf', rol:'s'},
  {id_user:2, email:'12445fdg', rol:'sdf'},
  {id_user:3, email:'dfg5r', rol:'sdf'},
  {id_user:4, email:'sfd456', rol:'dfgd'},
  {id_user:5, email:'sdfk67', rol:'dfg'},
  {id_user:6, email:'hj678', rol:'asd'},
  {id_user:7, email:'cvb45', rol:'sdfsdf'},
  {id_user:8, email:'zx435', rol:'dfg'},
  {id_user:9, email:'90', rol:'fgh'},
  {id_user:10, email:'123fdgddgdf', rol:'gh'},
]*/

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  crearUsersform: FormGroup;
  //usersForm: FormGroup;
  Users: any[] = [];
  rols:any;
  data:any[] = [];
  User!:InterUser;
  suscription!:Subscription;

  constructor(private Svuser: UsersService, private Svrol:RolsService, private _liveAnnouncer: LiveAnnouncer,private snackBar: MatSnackBar,private router:Router)
  {
    this.crearUsersform = new FormGroup({
      'email': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required
      ]),
      'rol': new FormControl('', [
        Validators.required
      ]),
    });
  }

  displayedColumns: string[] = ['id_user', 'email','rol', 'acciones'];
  dataSource = new MatTableDataSource(this.Users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  ngOnInit(): void {
    //this.cargarData()
    this.Svuser.get().subscribe((data: any)=>{
      this.Users = data;
    })
    this.getUsers();
    this.getRol();
    this.suscription = this.Svuser.refresh$.subscribe(()=>{
      this.getUsers();
    })
  }

  getUsers(): void{
    this.Svuser.get().subscribe((data: any)=>{
      this.data = data;
    })
  }

  getRol(): void{
    this.Svrol.get().subscribe((data:any)=>{
      this.rols = data
    })
    console.log(this.rols)
  }

  eliminar(id:Number):void {
    this.Svuser.delete(id).subscribe((data:any)=>{
      console.log(data)
    })
    this.Svuser.get()
  }

  cargarData(){
    //const data:any = this.user.getDataUser()
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
    this.router.navigate(['admin/editarUsuario'])
    console.log(data)
  }

}
