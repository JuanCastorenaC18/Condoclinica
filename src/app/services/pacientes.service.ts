import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { InterPaciente } from '../pages/admin/components/interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  refresh$ = new Subject<void>()

  constructor(private http:HttpClient) {}

  get(){
    return this.http.get(this.apiUrl + '/paciente');
  }
  create(paciente:InterPaciente):Observable<any>{
    return this.http.post(this.apiUrl + '/paciente/', paciente)
  }
  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/paciente/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  update(paciente:InterPaciente):Observable<any>{
    return this.http.put(`${this.apiUrl}/paciente/`, paciente)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  /*createPacientes(user:any){
    return this.http.post(this.apiUrl + '/PacientesCreate/:request', user)
  }

  getDataPacientes(){
    return this.http.get(this.apiUrl + '/PacientesGet/:request')
  }

  updatePacientes(id:any, user:any){
    return this.http.put(this.apiUrl + '/PacientesUp/' + id, user)
  }

  dropPacientes(id:any){
    return this.http.delete(this.apiUrl + '/PacientesDrop/' + id)
  }*/

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
