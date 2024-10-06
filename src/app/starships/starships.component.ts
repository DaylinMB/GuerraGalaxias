import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { inject } from '@angular/core';
import { StarshipService } from '../services/starship.service';
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
export class StarshipsComponent implements OnInit, OnDestroy {
  starships: Starship[] = [];
  nextPage: number = 1;
  loading: boolean = false;
  private http: HttpClient = inject(HttpClient);
  private observer: IntersectionObserver | undefined;
  private previousScrollPosition: number = 0;
  private hasMorePages: boolean = true;

  constructor(
    private starshipService: StarshipService,
    private el: ElementRef,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStarships();
    this.setupIntersectionObserver();
  }

  loadStarships(): void {
    if (this.loading || !this.hasMorePages) return;

    this.previousScrollPosition = window.pageYOffset;

    this.loading = true;

    const url = `${this.starshipService.starshipsUrl}?page=${this.nextPage}`;

    this.starshipService.getStarships(url).subscribe({
      next: (response) => {
        if (response.results && response.results.length) {
          this.starships = [...this.starships, ...response.results];
          this.nextPage++;
        }

        if (!response.next) {
          this.hasMorePages = false;
        }

        this.loading = false;
        this.cdr.detectChanges();

        window.scrollTo(0, this.previousScrollPosition);
      },
      error: (error) => {
        console.error('Error al cargar las naves:', error);
        this.loading = false;
      },
    });
  }

  goToDetails(starship: Starship) {
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
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.loading) {
          this.loadStarships();
        }
      });
    }, options);

    const target = this.el.nativeElement.querySelector('#scrollAnchor');
    if (target) {
      this.observer.observe(target);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
