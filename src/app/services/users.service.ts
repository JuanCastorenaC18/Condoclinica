import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { InterUser } from '../pages/admin/components/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  constructor(private http:HttpClient) {}

  refresh$ = new Subject<void>();

  get(){
    return this.http.get(this.apiUrl + '/getUser');
  }
  create(users:InterUser):Observable<any>{
    return this.http.post(this.apiUrl + '/createUser/', users)
  }
  delete(id:Number):Observable<any>{
    return this.http.delete(this.apiUrl+ '/destroy/' + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }
  update(users:InterUser):Observable<any>{
    return this.http.put(`${this.apiUrl}/update/`, users)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    );
  }

  /*createUser(user:any){
    return this.http.post(this.apiUrl + '/UserCreate/:request', user)
  }

  getDataUser(){
    return this.http.get(this.apiUrl + '/UserGet/:request')
  }

  updateUser(id:number, user:any){
    return this.http.put(this.apiUrl + '/UserUp/' + id, user)
  }

  dropUser(id:number){
    return this.http.delete(this.apiUrl + '/UserDrop/' + id)
  }*/

  /**tokenverificacioncrud(){
    const token=localStorage.getItem("token")
    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })
    return this.httpcliente.get('http://127.0.0.1:3333/token',{headers:tokenHeader})
  } */

}
