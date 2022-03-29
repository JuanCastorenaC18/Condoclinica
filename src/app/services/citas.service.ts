import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { InterCitas } from '../pages/admin/components/interfaces/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  refresh$ = new Subject<void>()

  constructor(private http:HttpClient) {}

  get(){
    return this.http.get(this.apiUrl + '/cita');
  }
  create(cita:InterCitas):Observable<any>{
    return this.http.post(this.apiUrl + '/cita/', cita)
  }
  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/cita/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  update(cita:InterCitas):Observable<any>{
    return this.http.put(`${this.apiUrl}/cita/`, cita)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  /*createCita(user:any){
    return this.http.post(this.apiUrl + '/CitaCreate/:request', user)
  }*/

  getDataCita(){
    return this.http.get(this.apiUrl + '/cita')
  }

  /*updateCita(id:any, user:any){
    return this.http.put(this.apiUrl + '/CitaUp/' + id, user)
  }

  dropCita(id:any){
    return this.http.delete(this.apiUrl + '/CitaDrop/' + id)
  }*/

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
