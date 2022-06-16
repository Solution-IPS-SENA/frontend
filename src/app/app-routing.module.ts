
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecepcionComponent } from "./recepcion/pages/recepcion.component";

const routes: Routes = [
    { path: '', loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'recepcion', loadChildren: () => import ('./recepcion/recepcion.module').then(m => m.RecepcionModule) },
    { path: 'historias', loadChildren: () => import('./routes/historia/historia.module').then(m => m.HistoriaModule) },
    { path: 'registro', loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'facturacion', loadChildren: () => import ('./facturacion/facturacion.module').then(m => m.FacturacionModule) }
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
