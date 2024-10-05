import { Routes } from '@angular/router';
import { StarshipsComponent } from './starships/starships.component';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './Guards/auth.guard'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'starships', component: StarshipsComponent,  canActivate: [AuthGuard]},
  { path: 'starship-details/:id', component: StarshipDetailsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];