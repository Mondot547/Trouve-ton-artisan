import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Artisan } from '../models/artisan.model';
import { ArtisanMethods } from './artisan-methods.service';

@Injectable({
  providedIn: 'root',
})
export class ArtisanSearchService {
  private artisans: Artisan[] = [];
  private filteredArtisansSubject = new BehaviorSubject<Artisan[]>([]);
  private artisanMethods!: ArtisanMethods; // Déclaration de l'instance de ArtisanMethods

  constructor(private http: HttpClient) {
    this.artisanMethods = new ArtisanMethods(); // Initialiser ArtisanMethods ici
    this.loadArtisans();
  }

  private loadArtisans() {
    this.http
      .get<Artisan[]>('http://localhost:4200/assets/datas.json')
      .subscribe((data) => {
        this.artisans = data;
        this.filteredArtisansSubject.next(this.artisans);
        this.artisanMethods.init(this.artisans); // Appeler init pour stocker les artisans
      });
  }

  resetSearchResults(): void {
    this.filteredArtisansSubject.next(this.artisans);
  }

  search(term: string): void {
    const filtered = this.artisans.filter(
      (artisan) =>
        artisan.name.toLowerCase().includes(term.toLowerCase()) ||
        artisan.specialty.toLowerCase().includes(term.toLowerCase()) ||
        artisan.location.toLowerCase().includes(term.toLowerCase())
    );
    this.filteredArtisansSubject.next(filtered);
  }

  getFilteredArtisans() {
    return this.filteredArtisansSubject.asObservable();
  }

  getArtisansByCategory(category: string) {
    return this.artisanMethods.getArtisansByCategory(category);
  }

  getArtisanById(id: string) {
    return this.artisanMethods.getArtisanById(id);
  }

  getTopRatedArtisans(limit: number = 3) {
    return this.artisanMethods.getTopRatedArtisans(limit);
  }
}
