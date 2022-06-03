import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-modulo-contable',
  templateUrl: './menu-modulo-contable.component.html',
  styleUrls: ['./menu-modulo-contable.component.css']
})
export class MenuModuloContableComponent implements OnInit {

  opcionesContable: any = [ //Este es para el contador
    {ruta:"../../../../assets/logos/024.JPG", nombre:"Facturacion"},
    {ruta:"../../../../assets/logos/007.jpg", nombre:"Consultas"},
    {ruta:"../../../../assets/logos/023.JPG", nombre:"Anulacion"},
    {ruta:"../../../../assets/logos/028.JPG", nombre:"Recibos"},
  ]

  @Input() opciones: any={}
  constructor() { }

  ngOnInit(): void {
  }

}
