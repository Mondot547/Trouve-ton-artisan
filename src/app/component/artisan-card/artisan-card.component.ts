import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { RouterModule } from '@angular/router';
import { Artisan } from '../../models/artisan.model';

@Component({
  selector: 'app-artisan-card',
  standalone: true,
  imports: [CommonModule, RatingStarsComponent, RouterModule],
  templateUrl: './artisan-card.component.html',
  styleUrl: './artisan-card.component.scss',
})
export class ArtisanCardComponent {
  @Input() artisan!: Artisan;
}
