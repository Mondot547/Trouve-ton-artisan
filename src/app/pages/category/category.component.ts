import { Artisan } from './../../models/artisan.model';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { ArtisanCardComponent } from '../../component/artisan-card/artisan-card.component';
import { CommonModule } from '@angular/common';
import { ArtisanSearchService } from '../../services/artisan.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ArtisanCardComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  artisans: Artisan[] = [];
  category: string = '';

  constructor(
    private artisanService: ArtisanSearchService,
    private route: ActivatedRoute
  ) {}

  // Récupérer la catégorie depuis les données de la route
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.category = data['category'];
      this.loadArtisansByCategory(this.category);
    });
  }

  // Charger les artisans de la catégorie
  loadArtisansByCategory(category: string): void {
    this.artisanService.getArtisansByCategory(category).subscribe((data) => {
      this.artisans = data;
    });
  }
}
