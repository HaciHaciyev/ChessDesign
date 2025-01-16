import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {TempComponent} from './features/temp/temp.component';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "entrance", loadComponent: () => import('./features/entrance/entrance.component').then(m => m.Entrance) },
  { path: "navbar", component: TempComponent }
];
