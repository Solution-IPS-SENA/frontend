
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/pages/login.component";
import { RegistroComponent } from "./auth/pages/registro.component";
import { RecepcionComponent } from "./recepcion/pages/recepcion.component";
import { formularioPrincipalComponent } from "./shared/pages/formularioPrincipal.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', component : LoginComponent },
    { path: 'recepcion', component: RecepcionComponent},
    { path: 'historias', loadChildren: () => import('./routes/historia/historia.module').then(m => m.HistoriaModule) },
    { path: 'registro', component: RegistroComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
