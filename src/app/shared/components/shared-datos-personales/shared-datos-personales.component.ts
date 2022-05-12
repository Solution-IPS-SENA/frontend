import { Component, OnInit } from '@angular/core';
import { InputDatosType } from '../../interfaces/input-datos';

@Component({
  selector: 'app-shared-datos-personales',
  templateUrl: './shared-datos-personales.component.html',
  styleUrls: ['./shared-datos-personales.component.css']
})
export class SharedDatosPersonalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatosType[] = [
    { id: "nombre", nombre: "Nombre", type: "text", for: "nombre" },
    { id: "apellido", nombre: "Apellido", type: "text", for: "apellido" },
    { id: "fechaNacimiento", nombre: "Fecha de Nacimiento", type: "date", for: "fechaNacimiento" },
    { id: "edad", nombre: "Edad", type: "text", for: "edad" },
    { id: "nacionalidad", nombre: "Nacionalidad", type: "select", for: "nacionalidad", options: [
      {
        valor: "puto",
        nombre: "Alejo",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo", 
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "lugarNacimiento", nombre: "Lugar de Nacimiento", type: "select", for: "lugarNacimiento",options: [
      {
        valor: "puto",
        nombre: "Alejo",
      },
      {
        valor: "perra",
        nombre: "Juank",
      },
      {
        valor: "imbecil",
        nombre: "Juanjo", 
      },
      {
        valor: "loca",
        nombre: "Julian",
      },
      {
        valor: "jejeje",
        nombre: "Jorge",
      },
    ] },
    { id: "genero", nombre: "Genero", type: "select", for: "genero",options: [
      {
        valor: "masculino",
        nombre: "Masculino",
      },
      {
        valor: "femenino",
        nombre: "Femenino",
      },
    ] },
    { id: "direccion", nombre: "Direccion", type: "text", for: "direccion" },
    { id: "telefono", nombre: "Telefono", type: "text", for: "telefono" }
  ]
}
