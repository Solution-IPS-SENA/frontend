import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shared-paginacion',
  templateUrl: './shared-paginacion.component.html',
  styleUrls: ['./shared-paginacion.component.css']
})
export class SharedPaginacionComponent implements OnInit {

  @Input() pages: number = 1;
  @Input() public currentPage = 0;
  @Input() state!: boolean | null;
  @Output() pageChange = new EventEmitter<number>();
  @Output() dataState = new EventEmitter<any>();

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
    this.dataState.emit();
    this.pageChange.emit(this.currentPage);
  }

  previousPage(){
    let op = this.currentPage -= 1;
    this.currentPage = op < 1 ? 1 : op;
    this.pageChange.emit(this.currentPage);
  }

}
