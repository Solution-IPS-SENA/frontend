import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shared-paginacion',
  templateUrl: './shared-paginacion.component.html',
  styleUrls: ['./shared-paginacion.component.css']
})
export class SharedPaginacionComponent implements OnInit {

  @Input() pages: number = 1;
  @Output() actualPage = new EventEmitter<string>();
  actual: number;

  constructor() {
    this.actual = 1; 
  }

  ngOnInit(): void {
  }

  reset(){

  }

  nextPage(){
    let op = this.actual += 1;
    this.actual = op > this.pages ? 10 : op
  }

  previousPage(){
    let op = this.actual -= 1;
    this.actual = op > 1 ? this.pages : op
  }

}
