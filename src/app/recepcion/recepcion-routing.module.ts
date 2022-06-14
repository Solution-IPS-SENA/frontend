import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionComponent } from './pages/recepcion.component';

const routes: Routes = [
  { path: '', component: RecepcionComponent},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecepcionRoutingModule { }
