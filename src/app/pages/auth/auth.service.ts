import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:string = 'http://127.0.0.1:3333'

  constructor(
    private http:HttpClient,
    private router:Router
  ) {

  }

  login(dataLogin:any){
    return this.http.post(this.apiUrl + '/login/:request',dataLogin)
  }

  register(dataReg:any){
    return this.http.post(this.apiUrl + '/UserCreate/:request',dataReg)
  }

}
