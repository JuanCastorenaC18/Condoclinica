import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { InterConsultas } from '../pages/admin/components/interfaces/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  refresh$ = new Subject<void>()

  constructor(private http:HttpClient) {}

  get(){
    return this.http.get(this.apiUrl + '/consulta');
  }
  create(consulta:InterConsultas):Observable<any>{
    return this.http.post(this.apiUrl + '/consulta/', consulta)
  }
  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/consulta/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  update(consulta:InterConsultas):Observable<any>{
    return this.http.put(`${this.apiUrl}/consulta/`, consulta)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  /*create(tratamiento:InterTratamiento):Observable<any>{
    return this.http.post(this.apiUrl + '/tratamiento', tratamiento)
  }

  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/tratamiento/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  update(tratamiento:InterTratamiento):Observable<any>{
    return this.http.put(`${this.apiUrl}/tratamiento`, tratamiento)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }*/

  /*createConsultas(user:any){
    return this.http.post(this.apiUrl + '/ConsultasCreate/:request', user)
  }

  getDataConsultas(){
    return this.http.get(this.apiUrl + '/ConsultasGet/:request')
  }

  updateConsultas(id:any, user:any){
    return this.http.put(this.apiUrl + '/ConsultasUp/' + id, user)
  }

  dropConsultas(id:any){
    return this.http.delete(this.apiUrl + '/ConsultasDrop/' + id)
  }*/

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
