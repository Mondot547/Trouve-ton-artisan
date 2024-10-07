import { Artisan } from './../../models/artisan.model';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
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
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  // Récupérer la catégorie depuis les données de la route
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.category = data['category'];
      this.loadArtisansByCategory(this.category);
      this.setMetaData(this.category)
    });
  }

  // Charger les artisans de la catégorie
  loadArtisansByCategory(category: string): void {
    this.artisanService.getArtisansByCategory(category).subscribe((data) => {
      this.artisans = data;
    });
  }

  setMetaData(category: string | null) {
    this.titleService.setTitle(`Catégorie: ${category}`);
    this.metaService.updateTag({ name: 'description', content: `Découvrez les artisans dans la catégorie ${category}.` });
    this.metaService.updateTag({ name: 'keywords', content: `artisan, ${category}, services` });
    this.metaService.updateTag({ property: 'og:title', content: `Catégorie: ${category}` });
    this.metaService.updateTag({ property: 'og:description', content: `Découvrez les artisans dans la catégorie ${category}.` });
  }
}
