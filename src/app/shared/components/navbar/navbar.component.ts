import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/shared/models/menu.interface';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menu: Menu[]=[];
  constructor(
    private menuService: MenuService,
    private cookie:CookieService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu(){
    this.menuService.getMenu().subscribe(data => {
      this.menu = data;
    })
  }

  logout(){
   localStorage.removeItem('token')
   this.cookie.deleteAll()
   alert('Cierre de sesion exitoso, hasta pronto...')
   this.router.navigate(['/'])
  }

}
