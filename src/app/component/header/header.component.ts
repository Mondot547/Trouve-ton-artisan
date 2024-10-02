import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArtisanSearchService, Artisan } from '../../services/artisan.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  filteredArtisans$ = this.artisanService.getFilteredArtisans();
  topRatedArtisans: Artisan[] = [];

  constructor(private artisanService: ArtisanSearchService) {}

  ngOnInit(): void {
    this.artisanService.getTopRatedArtisans().subscribe((data) => {
      this.topRatedArtisans = data;
    });
  }
}
