import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

interface Film {
  title: string;
  director: string;
  release_date: string;
  url: string;
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  @Input() starshipUrl!: string;

  films: Film[] = [];

  private readonly API_BASE_URL = 'https://swapi.dev/api/';
  private readonly IMG_FILMS_BASE_URL = 'https://starwars-visualguide.com/assets/img/films/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFilms(); 
  }

  fetchFilms(): void {
    this.http.get<{ films: string[] }>(this.starshipUrl).subscribe(starship => {
      if (starship.films && starship.films.length > 0) { 
        const filmRequests = starship.films.map((filmUrl: string) =>
          this.http.get<Film>(filmUrl) 
        );

        
        forkJoin(filmRequests).subscribe({
          next: (films) => {
            this.films = films as Film[];
          },
          error: (error) => {
            console.error('Error fetching films:', error); 
          }
        });
      } else {
        this.films = []; 
      }
    });
  }

  getFilmImage(url: string): string {
    const id = url.split('/')[5]; 
    return `${this.IMG_FILMS_BASE_URL}${id}.jpg`; 
  }
}