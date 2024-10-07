import { ArtisanCardComponent } from '../../component/artisan-card/artisan-card.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Artisan } from '../../models/artisan.model';
import { ArtisanSearchService } from '../../services/artisan.service';
import { CommentSliderComponent } from '../../component/comment-slider/comment-slider.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArtisanCardComponent, CommonModule, CommentSliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topRatedArtisans$: Observable<Artisan[]> = of([]); // Liste des artisans les mieux notés

  constructor(
    private artisanService: ArtisanSearchService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.setMetaData();
    this.topRatedArtisans$ = this.artisanService.getTopRatedArtisans(); // Utilise le service pour récupérer les artisans
  }

  setMetaData() {
    this.titleService.setTitle('Bienvenue sur notre site !');
    this.metaService.updateTag({ name: 'description', content: 'Ceci est la page d\'accueil de notre site. Découvrez nos artisans.' });
    this.metaService.updateTag({ name: 'keywords', content: 'artisan, accueil, services' });
    this.metaService.updateTag({ property: 'og:title', content: 'Bienvenue sur notre site !' });
    this.metaService.updateTag({ property: 'og:description', content: 'Ceci est la page d\'accueil de notre site. Découvrez nos artisans.' });
  }
}
