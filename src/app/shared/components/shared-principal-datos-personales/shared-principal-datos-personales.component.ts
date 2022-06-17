import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDatosOcupacionalesComponent } from '../shared-datos-ocupacionales/shared-datos-ocupacionales.component';
import { SharedDatosPersonalesComponent } from '../shared-datos-personales/shared-datos-personales.component';
import { SharedObservacionesComponent } from '../shared-observaciones/shared-observaciones.component';

@Component({
  selector: 'app-shared-principal-datos-personales',
  templateUrl: './shared-principal-datos-personales.component.html',
  styleUrls: ['./shared-principal-datos-personales.component.css']
})
export class SharedPrincipalDatosPersonalesComponent implements OnInit {

  constructor() { }

  @ViewChild(SharedDatosPersonalesComponent) public sharedPersonales?: SharedDatosPersonalesComponent;
  @ViewChild(SharedDatosOcupacionalesComponent) public sharedOcupacionales?: SharedDatosOcupacionalesComponent;
  @ViewChild(SharedObservacionesComponent) public sharedObservaciones?: SharedObservacionesComponent;

  ngOnInit(): void {
  }

  alerta(){
    console.warn(this.sharedPersonales?.form.patchValue({nombres: "hola"}));
    console.warn(this.sharedPersonales?.form.patchValue({apellidos: "como estas"}));

  }

}
