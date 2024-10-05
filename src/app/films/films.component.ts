import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

// Define la interfaz para las películas
interface Film {
  title: string;
  director: string;
  release_date: string;
  url: string; // URL de la película
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  @Input() starshipUrl!: string; // URL de la nave que se pasa como input

  films: Film[] = []; // Arreglo para almacenar las películas

  private readonly API_BASE_URL = 'https://swapi.dev/api/';
  private readonly IMG_FILMS_BASE_URL = 'https://starwars-visualguide.com/assets/img/films/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFilms(); // Llamada para obtener películas al inicializar el componente
  }

  fetchFilms(): void {
    this.http.get<{ films: string[] }>(this.starshipUrl).subscribe(starship => {
      if (starship.films && starship.films.length > 0) { // Verifica si hay films
        const filmRequests = starship.films.map((filmUrl: string) =>
          this.http.get<Film>(filmUrl) // Obtiene cada film
        );

        // Maneja las solicitudes de films con forkJoin
        forkJoin(filmRequests).subscribe({
          next: (films) => {
            this.films = films as Film[]; // Asigna las películas
          },
          error: (error) => {
            console.error('Error fetching films:', error); // Manejo de errores
          }
        });
      } else {
        this.films = []; // Si no hay films, asigna un arreglo vacío
      }
    });
  }

  getFilmImage(url: string): string {
    const id = url.split('/')[5]; // Obtiene el ID del film desde la URL
    return `${this.IMG_FILMS_BASE_URL}${id}.jpg`; // Devuelve la URL de la imagen del film
  }
}