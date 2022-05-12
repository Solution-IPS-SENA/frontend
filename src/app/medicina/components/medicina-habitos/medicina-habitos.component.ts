import { Component, OnInit } from '@angular/core';
import { InputDatosType } from 'src/app/shared/interfaces/input-datos';

@Component({
  selector: 'app-medicina-habitos',
  templateUrl: './medicina-habitos.component.html',
  styleUrls: ['./medicina-habitos.component.css']
})
export class MedicinaHabitosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  inputs: InputDatosType[] = [
    { id: "cigarrillo", nombre: "Cigarrillo", for: "cigarrillo", type:"input" },
    { id: "alcohol", nombre: "Alcohol", for: "alcohol", type:"input" },
    { id: "drogas", nombre: "Drogas", for: "drogas", type:"input" },
    { id: "deportes", nombre: "Deportes", for: "deportes", type:"input" },
    { id: "lesiones", nombre: "Lesiones", for: "lesiones", type:"input" }
 ]

}