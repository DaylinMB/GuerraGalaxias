import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Starship, StarshipDetails } from '../models/interfaces';
import { StarshipDetailsComponent } from '../starship-details/starship-details.component';

@Injectable({
  providedIn: 'root',
})
export class StarshipService {
  public starshipsUrl: string = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) {}
  searchStarships(name: string): Observable<Starship[]> {
    return this.http
      .get<{ results: Starship[] }>(`${this.starshipsUrl}?search=${name}`)
      .pipe(map((response) => response.results));
  }

  getStarships(
    url: string = this.starshipsUrl
  ): Observable<{ results: Starship[]; next: string | null }> {
    return this.http
      .get<{ results: Starship[]; next: string | null }>(url)
      .pipe(
        map((response) => {
          return {
            results: response.results.map((starship) => {
              starship.image = this.getImageUrl(starship.url, 'starship');
              console.log(`Starship Image URL: ${starship.image}`); // Verifica aquí
              return starship;
            }),
            next: response.next,
          };
        })
      );
  }

  public getImageUrl(url: string, type: string): string {
    const id = this.extractIdFromUrl(url);
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }

  private starshipUrl: string = 'http https://swapi.dev/api/';

  public extractIdFromUrl(url: string): string {
    const idMatch = url.match(/\/([0-9]+)\/$/);
    return idMatch ? idMatch[1] : '';
  }

  getStarshipDetails(id: string): Observable<StarshipDetails> {
    return this.http.get<StarshipDetails>(`${this.starshipsUrl}${id}/`);
  }

  getStarshipById(id: string): Observable<StarshipDetails> {
    return this.http.get<StarshipDetails>(
      `https://swapi.dev/api/starships/${id}/`
    );
  }
}
