import { ArtisanCardComponent } from '../../component/artisan-card/artisan-card.component';
import {
  ArtisanSearchService,
  Artisan,
} from './../../services/artisan.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArtisanCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  topRatedArtisans$: Observable<Artisan[]> = of([]); // Liste des artisans les mieux notés

  constructor(private artisanService: ArtisanSearchService) {}

  ngOnInit(): void {
    this.topRatedArtisans$ = this.artisanService.getTopRatedArtisans();
  }
}
