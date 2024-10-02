import { Component } from '@angular/core';
import { Artisan, ArtisanSearchService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="d-flex" #searchForm="ngForm" (ngSubmit)="onSubmit(searchForm)">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Ville, Spécialité, Noms"
        aria-label="Search"
        [(ngModel)]="searchTerm"
        (input)="onSearch()"
        name="search"
      />
      <button class="d-none" type="submit">Rechercher</button>
    </form>
  `,
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchTerm: string = '';

  constructor(
    private searchService: ArtisanSearchService,
    private router: Router
  ) {}

  onSearch(): void {
    this.searchService.search(this.searchTerm);

    //Rediriger vers la page artisan-list lors de la frappe
    if (this.router.url !== '/artisans-list') {
      this.router.navigate(['/artisans-list']);
    }
  }

  onSubmit(searchForm: NgForm): void {
    this.searchService.search(this.searchTerm);
    searchForm.resetForm();
  }
}
