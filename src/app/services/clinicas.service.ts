import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { InterClinica } from '../pages/admin/components/interfaces/clinica';

@Injectable({
  providedIn: 'root'
})
export class ClinicasService {
  getClinica() {
    throw new Error('Method not implemented.');
  }
  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  constructor(private http:HttpClient) {}

  refresh$ = new Subject<void>();

  get(){
    return this.http.get(this.apiUrl + '/clinica');
  }
  create(clinica:InterClinica):Observable<any>{
    return this.http.post(this.apiUrl + '/clinica', clinica)
  }

  /*createAse(user:any){
    return this.http.post(this.apiUrl + '/AseguradoraCreate/:request', user)
  }

  getDataAse(){
    return this.http.get(this.apiUrl + '/AseguradoraGet/:request')
  }

  updateAse(id:any, user:any){
    return this.http.put(this.apiUrl + '/AseguradoraUp/' + id, user)
  }*/

  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/clinica/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  update(clinica:InterClinica):Observable<any>{
    return this.http.put(`${this.apiUrl}/clinica`, clinica)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  /*reateClinica(user:any){
    return this.http.post(this.apiUrl + '/ClinicaCreate/:request', user)
  }

  getDataClinica(){
    return this.http.get(this.apiUrl + '/ClinicaGet/:request')
  }

  updateClinica(id:any, user:any){
    return this.http.put(this.apiUrl + '/ClinicaUp/' + id, user)
  }

  dropClinica(id:any){
    return this.http.delete(this.apiUrl + '/ClinicaDrop/' + id)
  }*/

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
