import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../shared/models/menu.interface';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  getMenu(): Observable<Menu[]>{
    return this.http.get<Menu[]>('../../assets/data/menu.json')
  }

  getMenu2(): Observable<Menu[]>{
    return this.http.get<Menu[]>('../../assets/data/menu2.json')
  }
}
