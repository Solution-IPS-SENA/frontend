import { Component, OnInit } from '@angular/core';
import { InputDatos } from '../../interfaces/input-datos';

@Component({
  selector: 'app-shared-cierre-historia-clinica',
  templateUrl: './shared-cierre-historia-clinica.component.html',
  styleUrls: ['./shared-cierre-historia-clinica.component.css']
})
export class SharedCierreHistoriaClinicaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputsMotivo: InputDatos[] = [
    { id: "motivo", nombre: "Motivo", for: "motivo", options: [
      {
        valor: "motivo",
        nombre: "motivo1",
      }
    ] }
  ]

  inputsRemitido: InputDatos[] = [
    { id: "remitido", nombre: "Remitido", for: "remitido", options: [
      {
        valor: "remitido",
        nombre: "remitido1",
      }
    ] }
  ]

  inputsConcepto: InputDatos[] = [
    { id: "concepto", nombre: "Concepto Final", for: "concepto", options: [
      {
        valor: "concepto",
        nombre: "concepto1",
      }
    ] }
  ]
}
