import { Component, OnInit, ElementRef } from '@angular/core';
import { inject } from '@angular/core';
import { StarshipService } from '../starship.service';
import { Starship } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
})
export class StarshipsComponent implements OnInit {
  starships: Starship[] = [];
  nextPage: number = 1;
  loading: boolean = false;

  private http: HttpClient = inject(HttpClient);
  private nextUrl: string | null = 'https://swapi.dev/api/starships';

  constructor(
    private starshipService: StarshipService,
    private el: ElementRef,
    private router: Router
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

  goToDetails(starship: Starship) {
    console.log('Nave seleccionada:', starship);
    const id = this.extractIdFromUrl(starship.url);
    this.router.navigate(['/starship-details', id]);
  }

  extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  setupIntersectionObserver(): void {
    const options = {
      root: null,
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
     imgElement.src = '/default-image.jpg';
   }
}
