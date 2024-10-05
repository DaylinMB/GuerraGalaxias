import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { StarshipService } from '../services/starship.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StarshipDetails } from '../models/interfaces';
import { ActivatedRoute } from '@angular/router';
import { PilotsComponent } from '@app/pilots/pilots.component';
import { FilmsComponent } from '@app/films/films.component';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [CommonModule, PilotsComponent, FilmsComponent ],
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.css'],
})
export class StarshipDetailsComponent implements OnInit {
  starship!: StarshipDetails;
  loading: boolean = true;

  private http: HttpClient = inject(HttpClient);

  constructor(
    private route: ActivatedRoute,
    private starshipService: StarshipService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadStarshipDetails(id);
    }
  }

  loadStarshipDetails(id: string): void {
    this.starshipService.getStarshipById(id).subscribe({
      next: (data) => {
        this.starship = data;
        console.log('Detalles de la nave:', this.starship); // Verificar aquí
        this.starship.image = this.getStarshipImage(id); // Asignar imagen
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la nave:', error);
        this.loading = false;
      },
    });
  }

  getStarshipImage(id: string): string {
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/default-image.jpg';
  }
}
