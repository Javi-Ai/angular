import { Routes } from '@angular/router';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { ListadoComponent } from './listado/listado.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

export const routes: Routes = [
    {
        path: '',
        component: NavBarComponent,
        children: [
            {
                path: '',
                component: ListadoComponent
            },
            {
                path: 'listado',
                component: ListadoComponent
            }, {
                path: 'crear',
                component: CrearProductoComponent
            },
            {
                path: 'editar/:id',
                component: EditarProductoComponent
            }
        ]

    }

];
