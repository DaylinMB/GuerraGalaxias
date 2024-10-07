import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilmsComponent } from '@app/films/films.component';
import { PilotsComponent } from '@app/pilots/pilots.component';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { StarshipsComponent } from '@app/starships/starships.component'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilmsComponent, PilotsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public router: Router, private authService: AuthService) {}


  navigateTo(route: string) {
    console.log(`Navigating to ${route}`);
    this.router.navigate([`/${route}`]);
  }
}
