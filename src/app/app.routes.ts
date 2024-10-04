import { Routes } from '@angular/router';
import { StarshipsComponent } from './starships/starships.component';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, 
    canActivate: [AuthGuard]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'starship-details/:id', component: StarshipDetailsComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];







// import { Routes } from '@angular/router';
// import { StarshipsComponent } from './starships/starships.component';
// import { StarshipDetailsComponent } from './starship-details/starship-details.component';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { AuthGuard } from './Guards/auth.guard';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent, 
//     canActivate: [AuthGuard]
//   },
//   { path: 'register', component: RegisterComponent },
//   { path: 'starships', component: StarshipsComponent },
//   { path: 'starship-details/:id', component: StarshipDetailsComponent },
//   { path: '', component: HomeComponent },
//   { path: '**', redirectTo: '' },
//   { path: '**', redirectTo: '/login' }
// ];