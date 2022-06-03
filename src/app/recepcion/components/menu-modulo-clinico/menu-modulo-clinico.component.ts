import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-modulo-clinico',
  templateUrl: './menu-modulo-clinico.component.html',
  styleUrls: ['./menu-modulo-clinico.component.css']
})
export class MenuModuloClinicoComponent implements OnInit {

  @Input() opciones: any={}
  constructor() {
    this.opciones = [ //Este es para doctores
      {ruta:"../../../../assets/logos/016.jpg", nombre:"Medicina", url: '/historias/medicina'},
      {ruta:"../../../../assets/logos/010.jpg", nombre:"Laboratorio", url: '/historias/laboratorio'},
      {ruta:"../../../../assets/logos/003.jpg", nombre:"Psicologia", url: '/historias/psicologia'},
      {ruta:"../../../../assets/logos/026.JPG", nombre:"Optometria", url: '/historias/optometria'},
      {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones", url: '/historias/certificaciones'},
    ]
  }

  ngOnInit(): void {
  }

}
