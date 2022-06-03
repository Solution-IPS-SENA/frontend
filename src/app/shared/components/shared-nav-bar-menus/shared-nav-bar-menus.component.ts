import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-nav-bar-menus',
  templateUrl: './shared-nav-bar-menus.component.html',
  styleUrls: ['./shared-nav-bar-menus.component.css']
})
export class SharedNavBarMenusComponent implements OnInit {

  @Input() titulo!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
