import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmpleadoGuard } from "../shared/guards/empleado.guard";
import { LoginComponent } from "./pages/login.component";
import { RegistroComponent } from "./pages/registro.component";

const routes: Routes = [
  { path: '', redirectTo:'login'},
  { path: 'login', pathMatch: 'full', component: LoginComponent  },
  { path: 'registro', pathMatch: 'full', component: RegistroComponent, canActivate: [EmpleadoGuard]  }
  ,
]

@NgModule({
    declarations: [],
    imports: [
    CommonModule,
    RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})

export class AuthRoutingModule{

}
