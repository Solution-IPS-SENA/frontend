import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoGuard } from 'src/app/shared/guards/empleado.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('../../shared/shared.module').then(m => m.SharedModule), canActivate: [EmpleadoGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
