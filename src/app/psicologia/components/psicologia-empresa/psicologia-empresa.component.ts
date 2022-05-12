import { Component, OnInit } from '@angular/core';
import { InputDatos } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-psicologia-empresa',
  templateUrl: './psicologia-empresa.component.html',
  styleUrls: ['./psicologia-empresa.component.css']
})
export class PsicologiaEmpresaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatos[] = [
    { id: "gestionOrganizacional", nombre: "Gestion organizacional", for: "gestionOrganizacional", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "caracteristicasOrganizacion", nombre: "Caracteristicas de la organizacion", for: "caracteristicasOrganizacion", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "condicionTarea", nombre: "Condicion de la tarea", for: "condicionTarea", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "caracteristicasGrupoTrabajo", nombre: "Caracteristicas del grupo de trabajo", for: "caracteristicasGrupoTrabajo", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "interfacePersonaTarea", nombre: "Interface persona - Tarea", for: "interfacePersonaTarea", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "jornadaTrabajo", nombre: "Jornada de trabajo", for: "jornadaTrabajo", options: [
      {
        valor: "si",
        nombre: "Si",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "condicionMedioAmbienteTrabajo", nombre: "Condicion medio ambiente de trabajo", for: "condicionMedioAmbienteTrabajo", options: [
      {
        valor: "temperatura",
        nombre: "Temperatura",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
    { id: "carga", nombre: "Carga", for: "carga", options: [
      {
        valor: "fuerza",
        nombre: "Fuerza",
      },
      {
        valor: "no",
        nombre: "No",
      },
    ] },
  ]

}
