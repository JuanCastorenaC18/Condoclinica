import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { InterAseguradoras } from '../pages/admin/components/interfaces/aseguradora';

@Injectable({
  providedIn: 'root'
})
export class AseguradoraService {

  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  constructor(private http:HttpClient) {}

  refresh$ = new Subject<void>();

  get(){
    return this.http.get(this.apiUrl + '/aseguradora');
  }
  create(aseguradora:InterAseguradoras):Observable<any>{
    return this.http.post(this.apiUrl + '/aseguradora/', aseguradora)
  }
  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/aseguradora/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  update(aseguradora:InterAseguradoras):Observable<any>{
    return this.http.put(`${this.apiUrl}/aseguradora/`, aseguradora)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  /*getaseguradora(){
    return this.http.get(this.apiUrl + '/aseguradora');
  }
  addase(aseguradora:InterAseguradoras):Observable<any>{
    return this.http.post(this.apiUrl + '/aseguradora', aseguradora)
  }

  createAse(user:any){
    return this.http.post(this.apiUrl + '/AseguradoraCreate/:request', user)
  }

  getDataAse(){
    return this.http.get(this.apiUrl + '/AseguradoraGet/:request')
  }

  updateAse(id:any, user:any){
    return this.http.put(this.apiUrl + '/AseguradoraUp/' + id, user)
  }

  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/aseguradora/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  dropAse(id:any){
    return this.http.delete(this.apiUrl + '/AseguradoraDrop/' + id)
  }*/

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  }*/
}
