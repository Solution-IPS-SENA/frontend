import { Component, OnInit} from '@angular/core';
import { InputDatosType } from '../../interfaces/input-datos';

@Component({
  selector: 'app-shared-datos-ocupacionales',
  templateUrl: './shared-datos-ocupacionales.component.html',
  styleUrls: ['./shared-datos-ocupacionales.component.css']
})
export class SharedDatosOcupacionalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatosType[] = [
    { id: "empresa", nombre: "Empresa", type: "text", for: "empresa" },
    { id: "cargo", nombre: "Cargo", type: "text", for: "cargo" },
    { id: "fechaIngreso", nombre: "Fecha de Ingreso", type: "date", for: "fechaIngreso" },
    { id: "tiempoCargo", nombre: "Tiempo en Cargo", type: "text", for: "tiempoCargo" },
    { id: "arl", nombre: "ARL", type: "select", for: "arl", options: [
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
    { id: "eps", nombre: "EPS", type: "select", for: "eps" , options: [
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
    { id: "afp", nombre: "AFP", type: "select", for: "afp" , options: [
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
    { id: "correo", nombre: "Correo", type: "text", for: "correo" },
    { id: "telefonoOcupacional", nombre: "Telefono", type: "text", for: "telefonoOcupacional" },
  ]

  
}
