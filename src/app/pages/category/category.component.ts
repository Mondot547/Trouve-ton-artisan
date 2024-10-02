import { ActivatedRoute } from '@angular/router';
import {
  ArtisanSearchService,
  Artisan,
} from './../../services/artisan.service';
import { Component, OnInit } from '@angular/core';
import { ArtisanCardComponent } from '../../component/artisan-card/artisan-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ArtisanCardComponent, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  artisans: Artisan[] = [];
  category: string = '';

  constructor(
    private artisanService: ArtisanSearchService,
    private route: ActivatedRoute
  ) {}

  //récupéré la catégorie de puis les données de la route
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.category = data['category'];
      this.loadArtisansByCategory(this.category);
    });
  }

  //changer les artisans de la catégorie
  loadArtisansByCategory(category: string): void {
    this.artisanService.getArtisansByCategory(category).subscribe((data) => {
      this.artisans = data;
    });
  }
}
