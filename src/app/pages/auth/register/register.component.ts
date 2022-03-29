import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { UserReg } from 'src/app/shared/models/users.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup
  loading = false;
  hide = true
  private isValidEmail = /\S+@\S+\.\S+/

  dataReg:UserReg =
  {
    email: '',
    password: '',
    rol: 0
  }

  FormularioRegistro= new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required]),
  })

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authSvc:AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
  }

  regis(){
    this.authSvc.register(this.dataReg).subscribe(
      (reg:any) =>{
        this.dataReg = reg
        this.router.navigate(['/login'])
        alert('Registro exitoso')
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

  mensaje(){
    const yes = this.snackBar.open('Registro creado con exito','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })

    const no = this.snackBar.open('Error al registrarse','',{
      duration:1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })

  }

  Loading(){
    this.loading = true
    setTimeout(()=>{
      this.router.navigate(['admin'])
    },1500)
  }

}
