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
  styleUrls: ['./pilots.component.css']
})
export class PilotsComponent implements OnInit {
  @Input() starshipUrl!: string; // URL de la nave que se pasa como input

  pilots: Character[] = []; // Arreglo para almacenar los pilotos

  private readonly API_BASE_URL = 'https://swapi.dev/api/';
  private readonly IMG_CHARACTERS_BASE_URL = 'https://starwars-visualguide.com/assets/img/characters/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPilots(); // Llamada para obtener pilotos al inicializar el componente
  }

  fetchPilots(): void {
    this.http.get<any>(this.starshipUrl).subscribe(starship => {
      if (starship.pilots.length > 0) { // Verifica si hay pilotos
        const pilotRequests = starship.pilots.map((pilotUrl: string) =>
          this.http.get<Character>(pilotUrl) // Obtiene cada piloto como un objeto Character
        );

        // Maneja las solicitudes de pilotos con forkJoin
        forkJoin(pilotRequests).subscribe({
          next: (pilots) => {
            this.pilots = pilots as Character[]; // Aserción de tipo
          },
          error: (error) => {
            console.error('Error fetching pilots:', error); // Manejo de errores
          }
        });
      } else {
        this.pilots = []; // Si no hay pilotos, asigna un arreglo vacío
      }
    });
  }

  getPilotImage(url: string): string {
    const id = url.split('/')[5]; // Obtiene el ID del piloto desde la URL
    return `${this.IMG_CHARACTERS_BASE_URL}${id}.jpg`; // Devuelve la URL de la imagen del piloto
  }
}