import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { InterMedico } from '../pages/admin/components/interfaces/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  refresh$ = new Subject<void>()

  constructor(private http:HttpClient) {}

  get(){
    return this.http.get(this.apiUrl + '/medico');
  }
  create(medico:InterMedico):Observable<any>{
    return this.http.post(this.apiUrl + '/medico/', medico)
  }
  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/medico/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  update(medico:InterMedico):Observable<any>{
    return this.http.put(`${this.apiUrl}/medico/`, medico)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  /*createMedicos(user:any){
    return this.http.post(this.apiUrl + '/MedicosCreate/:request', user)
  }

  getDataMedicos(){
    return this.http.get(this.apiUrl + '/MedicosGet/:request')
  }

  updateMedicos(id:any, user:any){
    return this.http.put(this.apiUrl + '/MedicosUp/' + id, user)
  }

  dropMedicos(id:any){
    return this.http.delete(this.apiUrl + '/MedicosDrop/' + id)
  }*/

  

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
