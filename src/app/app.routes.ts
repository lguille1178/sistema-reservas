import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { ReservaComponent } from './Pages/reserva/reserva.component';
//aqui vemos las rutas
export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'reserva/:id',component:ReservaComponent},
];
