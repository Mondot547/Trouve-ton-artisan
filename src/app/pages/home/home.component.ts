import { ArtisanCardComponent } from '../../component/artisan-card/artisan-card.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Artisan } from '../../models/artisan.model';
import { ArtisanSearchService } from '../../services/artisan.service';
import { CommentSliderComponent } from '../../component/comment-slider/comment-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArtisanCardComponent, CommonModule, CommentSliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topRatedArtisans$: Observable<Artisan[]> = of([]); // Liste des artisans les mieux notés

  constructor(private artisanService: ArtisanSearchService) {}

  ngOnInit(): void {
    this.topRatedArtisans$ = this.artisanService.getTopRatedArtisans(); // Utilise le service pour récupérer les artisans
  }
}
