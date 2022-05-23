import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shared-paginacion',
  templateUrl: './shared-paginacion.component.html',
  styleUrls: ['./shared-paginacion.component.css']
})
export class SharedPaginacionComponent implements OnInit {

  @Input() pages: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Input() public currentPage = 0;

  constructor() {
    this.currentPage = 1;
  }

  ngOnInit(): void {
  }

  reset(){
    this.pageChange.emit(1);
  }

  nextPage(){
    let op = this.currentPage += 1;
    this.currentPage = op > this.pages ? this.pages : op;
    this.pageChange.emit(this.currentPage);
  }

  previousPage(){
    let op = this.currentPage -= 1;
    this.currentPage = op < 1 ? 1 : op;
    this.pageChange.emit(this.currentPage);
  }

}
