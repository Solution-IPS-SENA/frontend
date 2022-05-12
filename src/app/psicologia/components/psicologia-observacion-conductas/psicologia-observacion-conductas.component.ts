import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-psicologia-observacion-conductas',
  templateUrl: './psicologia-observacion-conductas.component.html',
  styleUrls: ['./psicologia-observacion-conductas.component.css']
})
export class PsicologiaObservacionConductasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "presentacion", nombre: "Presentacion", for: "presentacion", options: [
      {
        valor: "adecuado",
        nombre: "Adecuado",
      },
      {
        valor: "inadecuado",
        nombre: "Inadecuado",
      },
    ] },
    { id: "postura", nombre: "Postura", for: "postura", options: [
      {
        valor: "adecuado",
        nombre: "Adecuado",
      },
      {
        valor: "inadecuado",
        nombre: "Inadecuado",
      },
    ] },
    { id: "discursoRitmo", nombre: "Discurso - Ritmo", for: "discursoRitmo", options: [
      {
        valor: "adecuado",
        nombre: "Adecuado",
      },
      {
        valor: "inadecuado",
        nombre: "Inadecuado",
      },
    ] },
    { id: "tono", nombre: "Tono", for: "tono", options: [
      {
        valor: "adecuado",
        nombre: "Adecuado",
      },
      {
        valor: "inadecuado",
        nombre: "Inadecuado",
      },
    ] },
    { id: "articulacion", nombre: "Articulacion", for: "articulacion", options: [
      {
        valor: "adecuado",
        nombre: "Adecuado",
      },
      {
        valor: "inadecuado",
        nombre: "Inadecuado",
      },
    ] },
    { id: "orientacionTiempo", nombre: "Orientacion - Tiempo", for: "orientacionTiempo", options: [
      {
        valor: "adecuado",
        nombre: "Adecuado",
      },
      {
        valor: "inadecuado",
        nombre: "Inadecuado",
      },
    ] },
    { id: "orientacionEspacio", nombre: "Orientacion - Espacio", for: "orientacionEspacio", options: [
      {
        valor: "adecuado",
        nombre: "Adecuado",
      },
      {
        valor: "inadecuado",
        nombre: "Inadecuado",
      },
    ] },
    { id: "orientacionPersona", nombre: "Orientacion - Persona", for: "orientacionPersona", options: [
      {
        valor: "adecuado",
        nombre: "Adecuado",
      },
      {
        valor: "inadecuado",
        nombre: "Inadecuado",
      },
    ] },

  ]
}
