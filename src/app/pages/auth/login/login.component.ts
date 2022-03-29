import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { AuthLog, UserLogin, UserReg } from 'src/app/shared/models/users.interface';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  loading = false;
  hide = true
  private isValidEmail = /\S+@\S+\.\S+/

  dataLog:UserLogin =
  {
    email: '',
    password: ''
  }

  FormularioRegistro= new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required]),
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc:AuthService,
    private snackBar: MatSnackBar,
    private cookie:CookieService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {

  }

  logeo() {
    this.authSvc.login(this.dataLog).subscribe(
      (user:AuthLog) =>{
        localStorage.setItem('token',user.token)
        this.cookie.set('token',user.token)
        alert('Inicio sesion exitoso')
      }
    )
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
    else if (this.form.get(field)?.hasError('pattern'))
    {
      message = 'Email invalido'
    }
    else if (this.form.get(field)?.hasError('minLength'))
    {
      const minLength = this.form.get(field)?.errors?.["minLength"]?.requiredLength
      message = 'Este campo requiere una longitud mayor a 5 caracteres'
    }
    return message
  }

  //pruebas

  mensajeError(){
    this.snackBar.open('Error al logearse','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })

  }

  mensajeExito(){
    this.snackBar.open('Login exitoso','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })

  }

  loadingAdmin(){
    this.loading = true
    setTimeout(()=>{
      this.router.navigate(['/admin'])
    },1500)
  }

  loadingUser(){
    this.loading = true
    setTimeout(()=>{
      this.router.navigate(['/paciente'])
    },1500)
  }

  fakeLogin(){
    const email = this.form.value.email
    const password = this.form.value.password

    if(email == 'admin@gmail.com' && password == 'admin123'){
      this.loadingAdmin()
    }
    else if(email == 'user@gmail.com' && password == 'user123'){
      this.loadingUser()
    }
    else{
      this.mensajeError()
      this.form.reset()
    }
  }

}
