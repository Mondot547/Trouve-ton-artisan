import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArtisanSearchService } from '../../services/artisan.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Artisan } from '../../models/artisan.model';
import { ArtisanMethods } from '../../services/artisan-methods.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  Logo: string = '/assets/images/Logo.png';
  filteredArtisans$ = this.artisanService.getFilteredArtisans();
  topRatedArtisans: Artisan[] = [];

  constructor(
    private ArtisanMethods: ArtisanMethods,
    private artisanService: ArtisanSearchService
  ) {}

  ngOnInit(): void {
    this.ArtisanMethods.getTopRatedArtisans().subscribe((data) => {
      this.topRatedArtisans = data;
    });
  }
}
