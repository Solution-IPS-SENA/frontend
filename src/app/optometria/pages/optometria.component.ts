import { Component } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { ObtenerAnexosService } from "../../shared/services/obtener-anexos.service";

@Component({
    selector: 'optometria',
    templateUrl: './optometria.html',
})
export class OptometriaComponent {


  titulo: string;

  constructor(private router: Router) {
    this.currentPage = this.getCurrentPageUrl();
    this.titulo = 'Módulo Clinico Optometria';
  }

  public currentPage = 0;

  public onPageChange(currentPage: number) {
    this.router.navigate(['/historias', 'optometria', currentPage]).then(() => {
      this.currentPage = this.getCurrentPageUrl();
    });
  }

  public getCurrentPageUrl(): number {
    const urlSegments = this.router.url.split('/');
    return parseInt(urlSegments[urlSegments.length - 1] ?? '0');
  }
}
