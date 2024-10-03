import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipsComponent } from "./starships/starships.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,StarshipsComponent , RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentView = 'home'; // Vista inicial

  switchView(view: string) {
    this.currentView = view;
  }

  someCondition = true;
}
