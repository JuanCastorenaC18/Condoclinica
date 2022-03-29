import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { InterTratamiento } from '../pages/admin/components/interfaces/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {
  getTratamientos(): any {
    throw new Error('Method not implemented.');
  }

  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  constructor(private http:HttpClient) {}

  refresh$ = new Subject<void>();

  get(){
    return this.http.get(this.apiUrl + '/tratamiento');
  }
  create(tratamiento:InterTratamiento):Observable<any>{
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
  }
  /*createTratamientos(user:any){
    return this.http.post(this.apiUrl + '/TratamientosCreate/:request', user)
  }

  getDataTratamientos(){
    return this.http.get(this.apiUrl + '/TratamientosGet/:request')
  }

  updateTratamientos(id:any, user:any){
    return this.http.put(this.apiUrl + '/TratamientosUp/' + id, user)
  }

  dropTratamientos(id:any){
    return this.http.delete(this.apiUrl + '/TratamientosDrop/' + id)
  }*/

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
