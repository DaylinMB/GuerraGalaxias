import { Component, OnInit, ElementRef } from '@angular/core';
import { inject } from '@angular/core';
import { StarshipService } from '../starship.service';
import { Starship } from '../models/interfaces';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClientModule. Esto sale tachado
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
})
export class StarshipsComponent implements OnInit {
  starships: Starship[] = [];
  nextPage: number = 1;
  loading: boolean = false;

  private http: HttpClient = inject(HttpClient); // Usando inject para HttpClient
  private nextUrl: string | null = 'https://swapi.dev/api/starships'; // Definición de nextUrl

  constructor(
    private starshipService: StarshipService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadStarships();
    this.setupIntersectionObserver();
  }

  loadStarships(): void {
    if (this.loading) return;
    this.loading = true;

    const url = `${this.starshipService.starshipsUrl}?page=${this.nextPage}`;

    this.starshipService.getStarships(url).subscribe({
      next: (response) => {
        if (response.results && response.results.length) {
          this.starships = [...this.starships, ...response.results];
          this.nextPage++;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar las naves:', error);
        this.loading = false;
      },
    });
  }

  setupIntersectionObserver(): void {
    const options = {
      root: null, // el viewport
      threshold: 0.1, // ejecutarse cuando el 10% del elemento sea visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.loading) {
          this.loadStarships();
        }
      });
    }, options);

    const target = this.el.nativeElement.querySelector('#scrollAnchor');
    observer.observe(target);
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/default-image.jpg'; // Cambia esto a la ruta correcta de tu imagen por defecto
  }
}