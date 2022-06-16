import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarConfiguracionRutasService } from '../../services/navbar-configuracion-rutas.service';

@Component({
  selector: 'app-shared-nav-bar',
  templateUrl: './shared-nav-bar.component.html',
  styleUrls: ['./shared-nav-bar.component.css']
})
export class SharedNavBarComponent implements OnInit {

  constructor(private navBarConfig: NavbarConfiguracionRutasService, private route: Router) { }

  ngOnInit(): void {
  }

  @Input() titulo!:string;

  public get urlDatosPaciente() {
    return this.navBarConfig.rutaDatosPaciente;
  }

  public get urlHistoriaClinica() {
    return this.navBarConfig.rutaHistoriaClinica;
  }

  logOut() : void {
    localStorage.removeItem('token');
    localStorage.clear();
    this.route.navigate( ['/login'])
  }

}
