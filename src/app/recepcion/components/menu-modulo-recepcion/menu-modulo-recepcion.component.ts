import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-modulo-recepcion',
  templateUrl: './menu-modulo-recepcion.component.html',
  styleUrls: ['./menu-modulo-recepcion.component.css']
})
export class MenuModuloRecepcionComponent implements OnInit {


  @Input() opciones: any={}
  constructor() {
    this.opciones = [ //Este es para secretarios
    {ruta:"../../../../assets/logos/007.jpg", nombre:"Consultas"},
    {ruta:"../../../../assets/logos/022.JPG", nombre:"Citas"},
    {ruta:"../../../../assets/logos/024.JPG", nombre:"Facturacion"},
    {ruta:"../../../../assets/logos/019.JPG", nombre:"Registro Paciente"},
    {ruta:"../../../../assets/logos/021.JPG", nombre:"Certificaciones"},
    {ruta:"../../../../assets/logos/023.JPG", nombre:"Cancelaciones"},
    {ruta:"../../../../assets/logos/025.JPG", nombre:"Remisiones"},
    {ruta:"../../../../assets/logos/019.JPG", nombre:"Registro Personal"},
  ]
  }

  ngOnInit(): void {
  }

}
