import { Component, OnInit } from '@angular/core';
import { InputDatosDoble } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-optometria-hallazgos',
  templateUrl: './optometria-hallazgos.component.html',
  styleUrls: ['./optometria-hallazgos.component.css']
})
export class OptometriaHallazgosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputsHallazgo1: InputDatosDoble[] = [
    { id: "ojoDerechoCerca", nombre: "Examen externo", options: [
      {
        valor: "20/20",
        nombre: "20/20",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ], 
    options2: [
      {
        valor: "30/30",
        nombre: "30/30",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ]},
    { id: "ojoIzquierdoCerca", nombre: "Motilidad ocular", options: [
      {
        valor: "20/20",
        nombre: "20/20",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ], 
    options2: [
      {
        valor: "30/30",
        nombre: "30/30",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ]},
    { id: "ambosCerca", nombre: "Oftalmoscopia", options: [
      {
        valor: "20/20",
        nombre: "20/20",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ], 
    options2: [
      {
        valor: "30/30",
        nombre: "30/30",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ]},
    { id: "ambosCRT", nombre: "Campo visual por confrontacion", options: [
      {
        valor: "20/20",
        nombre: "20/20",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ], 
    options2: [
      {
        valor: "30/30",
        nombre: "30/30",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ]},
 ]

 inputsHallazgo2: InputDatosDoble[] = [
    { id: "ojoDerechoLejos", nombre: "Estereopsis", options: [
      {
        valor: "20/20",
        nombre: "20/20",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ], 
    options2: [
      {
        valor: "30/30",
        nombre: "30/30",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ]},
    { id: "ojoIzquierdoLejos", nombre: "Percepcion cromatica", options: [
      {
        valor: "20/20",
        nombre: "20/20",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ], 
    options2: [
      {
        valor: "30/30",
        nombre: "30/30",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ]},
    { id: "observacionesOptoHallazgos", nombre: "Observaciones",}
  ]
}
