import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.scss',
})
export class RatingStarsComponent {
  @Input() rating: number = 0; // Note reçue en entrée

  getStars(): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= this.rating ? 'filled' : 'empty'); // Crée une liste d'étoiles
    }
    return stars;
  }
}
