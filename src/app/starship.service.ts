import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Starship } from './models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class StarshipService {
  public starshipsUrl: string = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) {}
  searchStarships(name: string): Observable<Starship[]> {
    return this.http.get<{ results: Starship[] }>(`${this.starshipsUrl}?search=${name}`).pipe(
        map(response => response.results)
    );
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


  private getImageUrl(url: string, type: string): string {
    const id = this.extractIdFromUrl(url);
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }

  private starshipUrl: string = 'http https://swapi.dev/api/';

  private extractIdFromUrl(url: string): string {
    const idMatch = url.match(/\/([0-9]+)\/$/);
    return idMatch ? idMatch[1] : '';
  }

  getStarshipDetails(id: string): Observable<Starship> {
    return this.http.get<Starship>(`${this.starshipsUrl}${id}/`);
  }
}
