import { Routes } from '@angular/router';
import { StarshipsComponent } from './starships/starships.component';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'starship-details/:id', component: StarshipDetailsComponent },
  { path: '**', redirectTo: '' },
];
