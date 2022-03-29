import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolsService {

  apiUrl:string = 'http://192.168.1.68:3333/api/v1'

  constructor(private http:HttpClient) { }

  get():Observable<any>{
    return this.http.get(this.apiUrl+ '/rol');
  }
}
