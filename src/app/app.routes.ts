import { Routes, RouterModule } from '@angular/router';
import { StarshipsComponent } from './starships/starships.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: '**', redirectTo: '' },
];
