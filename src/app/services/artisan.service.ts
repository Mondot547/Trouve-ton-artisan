import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Artisan {
  id: string;
  name: string;
  image: string;
  specialty: string;
  location: string;
  note: number;
  category: string;
  website: string;
  about: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArtisanSearchService {
  private artisans: Artisan[] = [];
  private filteredArtisansSubject = new BehaviorSubject<Artisan[]>([]);

  constructor(private http: HttpClient) {
    this.loadArtisans();
  }

  private loadArtisans() {
    this.http
      .get<Artisan[]>('http://localhost:4200/assets/datas.json')
      .subscribe((data) => {
        this.artisans = data;
        this.filteredArtisansSubject.next(this.artisans);
      });
  }

  //Méthode de réinitialisation
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

  getFilteredArtisans(): Observable<Artisan[]> {
    return this.filteredArtisansSubject.asObservable();
  }

  getTopRatedArtisans(limit: number = 3): Observable<Artisan[]> {
    return new Observable<Artisan[]>((observer) => {
      this.filteredArtisansSubject.subscribe((artisans) => {
        const topRated = artisans
          .slice()
          .sort((a, b) => b.note - a.note) // Trier par note décroissante
          .slice(0, limit); // Obtenir les 3 meilleurs artisans
        observer.next(topRated);
      });
    });
  }

  getArtisansByCategory(category: string): Observable<Artisan[]> {
    const filtered = this.artisans.filter(
      (artisan) => artisan.category === category
    );
    return new BehaviorSubject<Artisan[]>(filtered).asObservable();
  }

  getArtisanById(id: string): Observable<Artisan | undefined> {
    const artisan = this.artisans.find((artisan) => artisan.id === id);
    return new BehaviorSubject<Artisan | undefined>(artisan).asObservable();
  }
}
