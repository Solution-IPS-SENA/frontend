import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'citas',
    templateUrl: './citas.html',
})
export class CitasComponent {

  titulo: string;

  constructor(private router: Router) {
    this.currentPage = this.getCurrentPageUrl();
    this.titulo = 'Citas';
  }

  public currentPage = 0;

  public onPageChange(currentPage: number) {
    this.router.navigate(['/historias', 'agendamiento', currentPage]).then(() => {
      this.currentPage = this.getCurrentPageUrl();
    });
  }

  public getCurrentPageUrl(): number {
    const urlSegments = this.router.url.split('/');
    return parseInt(urlSegments[urlSegments.length - 1] ?? '0');
  }
}
