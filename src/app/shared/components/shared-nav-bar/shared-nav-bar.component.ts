import { Component, OnInit } from '@angular/core';
import { NavbarConfiguracionRutasService } from '../../services/navbar-configuracion-rutas.service';

@Component({
  selector: 'app-shared-nav-bar',
  templateUrl: './shared-nav-bar.component.html',
  styleUrls: ['./shared-nav-bar.component.css']
})
export class SharedNavBarComponent implements OnInit {

  constructor(private navBarConfig: NavbarConfiguracionRutasService) { }

  ngOnInit(): void {
  }

  public get urlDatosPaciente() {
    return this.navBarConfig.rutaDatosPaciente;
  }

  public get urlHistoriaClinica() {
    return this.navBarConfig.rutaHistoriaClinica;
  }

}
