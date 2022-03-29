import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  apiUrl:string = 'http://192.168.80.220:3333/api/v1'

  constructor(
    private http:HttpClient
  ) {

  }

  createCita(user:any){
    return this.http.post(this.apiUrl + '/CitaCreate/:request', user)
  }

  getDataCita(){
    return this.http.get(this.apiUrl + '/CitaGet/:request')
  }

  updateCita(id:any, user:any){
    return this.http.put(this.apiUrl + '/CitaUp/' + id, user)
  }

  dropCita(id:any){
    return this.http.delete(this.apiUrl + '/CitaDrop/' + id)
  }

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
