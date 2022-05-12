import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-medicina-antecedentes-2',
  templateUrl: './medicina-antecedentes-2.component.html',
  styleUrls: ['./medicina-antecedentes-2.component.css']
})
export class MedicinaAntecedentes2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "fupFecha", nombre: "FUP (Fecha)", for: "fupFecha", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "fumFecha", nombre: "FUM (Fecha)", for: "fumFecha", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "planifica", nombre: "Planifica", for: "planifica", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "dismenorrea", nombre: "Dismenorrea", for: "dismenorrea", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "dispareunia", nombre: "Dispareunia", for: "dispareunia", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "ecoMamaria", nombre: "Eco - Mamaria", for: "ecoMamaria", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "cicloMenstrual", nombre: "Ciclo menstrual", for: "cicloMenstrual", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
 ]
}
