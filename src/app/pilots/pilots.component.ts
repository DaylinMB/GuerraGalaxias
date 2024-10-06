import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Character } from '@app/models/interfaces';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.css'],
})
export class PilotsComponent implements OnInit {
  @Input() starshipUrl!: string;

  pilots: Character[] = [];

  private readonly API_BASE_URL = 'https://swapi.dev/api/';
  private readonly IMG_CHARACTERS_BASE_URL =
    'https://starwars-visualguide.com/assets/img/characters/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPilots();
  }

  fetchPilots(): void {
    this.http.get<any>(this.starshipUrl).subscribe((starship) => {
      if (starship.pilots.length > 0) {
        const pilotRequests = starship.pilots.map((pilotUrl: string) =>
          this.http.get<Character>(pilotUrl)
        );

        forkJoin(pilotRequests).subscribe({
          next: (pilots) => {
            this.pilots = pilots as Character[];
          },
          error: (error) => {
            console.error('Error fetching pilots:', error);
          },
        });
      } else {
        this.pilots = [];
      }
    });
  }

  getPilotImage(url: string): string {
    const id = url.split('/')[5];
    return `${this.IMG_CHARACTERS_BASE_URL}${id}.jpg`;
  }
}
