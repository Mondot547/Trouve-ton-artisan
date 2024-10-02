import { Injectable } from '@angular/core';
import { Artisan } from '../models/artisan.model';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root', // Fournir le service à l'échelle de l'application
})
export class ArtisanMethods {
  private artisansSubject = new BehaviorSubject<Artisan[]>([]); // Sujet pour stocker les artisans
  artisans$ = this.artisansSubject.asObservable(); // Observable pour exposer les artisans

  // Méthode d'initialisation pour définir les artisans
  init(artisans: Artisan[]): void {
    this.artisansSubject.next(artisans); // Met à jour les artisans
  }

  getTopRatedArtisans(limit: number = 3): Observable<Artisan[]> {
    return this.artisans$.pipe(
      map(
        (artisans) =>
          artisans
            .slice()
            .sort((a, b) => b.note - a.note) // Trier par note décroissante
            .slice(0, limit) // Obtenir les 3 meilleurs artisans
      )
    );
  }

  getArtisansByCategory(category: string): Observable<Artisan[]> {
    return this.artisans$.pipe(
      map((artisans) =>
        artisans.filter((artisan) => artisan.category === category)
      )
    );
  }

  getArtisanById(id: string): Observable<Artisan | undefined> {
    return this.artisans$.pipe(
      map((artisans) => artisans.find((artisan) => artisan.id === id))
    );
  }
}
