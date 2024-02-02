import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';


export const routes: Routes = [
    { 
        path: 'template',
        loadChildren: () => import("./template/routes").then(mod => mod.router)
      },
      { 
        path: 'reactive',
        loadChildren: () => import("./reactive/routes").then(mod => mod.routerR)
        
      },
      {
        path: 'auth',
        loadChildren: () => import("./auth/routes").then(mod => mod.routerA)
      },
      {
        path: '',
        redirectTo: 'template/basicos',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
];
