import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'certificaciones',
    templateUrl: './certificaciones.html',
})
export class CertificacionesComponent {

  titulo: string;

  constructor(private router: Router) {
    this.currentPage = this.getCurrentPageUrl();
    this.titulo = 'Módulo Clinico certificaciones';
  }

  public currentPage = 0;

  public onPageChange(currentPage: number) {
    this.router.navigate(['/historias', 'certificaciones', currentPage]).then(() => {
      this.currentPage = this.getCurrentPageUrl();
    });
  }

  public getCurrentPageUrl(): number {
    const urlSegments = this.router.url.split('/');
    return parseInt(urlSegments[urlSegments.length - 1] ?? '0');
  }
}
