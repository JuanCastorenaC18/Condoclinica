import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { User, Users } from 'src/app/shared/models/users.interface';
import { InterUser } from '../../interfaces/user';
import { RolsService } from 'src/app/services/rols.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {

  public form:FormGroup
  isValid:any;
  userForm!: FormGroup;
  crearuserform: FormGroup;
  Users: any[] = [];
  rols:any;
  data:any[]=[];
  Usersi!:InterUser;
  suscription!:Subscription;

  constructor( public fb:FormBuilder,private Svuser:UsersService, private Svrol:RolsService,private router:Router,private snackBar:MatSnackBar) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    })

    this.crearuserform = new FormGroup({
      'email': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required
      ]),
      'rol': new FormControl('', [
        Validators.required
      ]),
    })
    this.createForm();
  }

  ngOnInit(): void {
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

  agregar():void{
    if(this.userForm.invalid){
      return Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this.setUser();
      this.Svuser.create(this.Usersi).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
      })
    }
  }

  setUser():void{
    this.Usersi = {
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      rol: this.userForm.get('rol')?.value
    }
  }

  edit():void{
    if(this.userForm.invalid){
      return Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.setUser();
      this.Svuser.update(this.Usersi).subscribe((data:any)=>{
        console.log("Se agrego correctamente")
        /*timeMessage('Updating...', 1500).then(()=>{
          successDialog('Update completado');
        })*/
      })
    }
  }

  mensajeExito(){
    this.snackBar.open('Registro ingresado correctamente','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }

  isValidField(field:string): boolean | any{
    return(
      (this.form.get(field)?.touched || this.form.get(field)?.dirty) && !this.form.get(field)?.valid
    )
  }

  getErrorMessage(field:string):string | any{
    let message
    if (this.form.get(field)?.errors?.["required"])
    {
      message = 'Debes ingresar un valor'
    }
    return message
  }

  createForm(): void {
    this.userForm = this.fb.group({
      email:[''],
      password:[''],
      rol:[2]
    })
  }

  regresar(){
    this.router.navigate(['admin/usuarios'])
  }

  cargarEdit(data:User){
    this.form.value.email = data.email
    this.form.value.password = data.password
    this.form.value.rol = data.rol
  }

}
function getUsers(): ((error: any) => void) | null | undefined {
  throw new Error('Function not implemented.');
}

