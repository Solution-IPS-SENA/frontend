import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shared-observaciones',
  templateUrl: './shared-observaciones.component.html',
  styleUrls: ['./shared-observaciones.component.css']
})
export class SharedObservacionesComponent implements OnInit {

  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
  
}
