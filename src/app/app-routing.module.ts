
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/pages/login.component";
import { RecepcionComponent } from "./recepcion/pages/recepcion.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', component : LoginComponent },
    { path: 'recepcion', component: RecepcionComponent},
    { path: 'historias', loadChildren: () => import('./routes/historia/historia.module').then(m => m.HistoriaModule) }
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