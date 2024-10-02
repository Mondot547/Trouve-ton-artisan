import { ArtisanSearchService } from './../../services/artisan.service';
import { Component } from '@angular/core';
import { ArtisanCardComponent } from '../../component/artisan-card/artisan-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artisan-list',
  standalone: true,
  imports: [ArtisanCardComponent, CommonModule],
  templateUrl: './artisan-list.component.html',
  styleUrl: './artisan-list.component.scss',
})
export class ArtisanListComponent {
  filteredArtisans$ = this.ArtisanSearchService.getFilteredArtisans();
  constructor(private ArtisanSearchService: ArtisanSearchService) {}

  ngOnInit(): void {
    this.ArtisanSearchService.resetSearchResults();
  }
}
