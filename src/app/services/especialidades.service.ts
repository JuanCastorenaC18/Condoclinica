import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { InterEspecialidad } from '../pages/admin/components/interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  apiUrl:string = 'http://192.168.1.68:3333/api/v1'
  refresh$ = new Subject<void>()

  constructor(private http:HttpClient) {}

  get(){
    return this.http.get(this.apiUrl + '/especialidad');
  }
  create(especialidad:InterEspecialidad):Observable<any>{
    return this.http.post(this.apiUrl + '/especialidad/', especialidad)
  }
  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/especialidad/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  update(especialidad:InterEspecialidad):Observable<any>{
    return this.http.put(`${this.apiUrl}/especialidad/`, especialidad)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  /*createEspecialidad(user:any){
    return this.http.post(this.apiUrl + 'especialidad', user)
  }

  getDataEspecialidad(){
    return this.http.get(this.apiUrl + '/EspecialidadGet/:request')
  }

  updateEspecialidad(id:any, user:any){
    return this.http.put(this.apiUrl + '/EspecialidadUp/' + id, user)
  }

  dropEspecialidad(id:any){
    return this.http.delete(this.apiUrl + '/EspecialidadDrop/' + id)
  }*/

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
