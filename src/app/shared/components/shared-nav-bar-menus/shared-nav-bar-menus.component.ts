import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-shared-nav-bar-menus',
  templateUrl: './shared-nav-bar-menus.component.html',
  styleUrls: ['./shared-nav-bar-menus.component.css']
})
export class SharedNavBarMenusComponent implements OnInit {

  @Input() titulo!: string;

  constructor(private route: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
    this.route.navigate( ['/login'])
  }
}
