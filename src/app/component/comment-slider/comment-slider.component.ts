import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-comment-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-slider.component.html',
  styleUrl: './comment-slider.component.scss'
})
export class CommentSliderComponent implements OnInit, OnDestroy {
  comments = [
    { text: 'Un service incroyable, je recommande !', author: 'John Doe' },
    { text: 'Très satisfait, artisan à l’écoute.', author: 'Jane Smith' },
    { text: 'Rapide et efficace, super travail !', author: 'Emily Johnson' },
  ];

  currentIndex = 0;
  translateXValue = 0; // Valeur pour la translation des slides
  intervalId: any; // Pour stocker l'ID du setInterval
  isBrowser: boolean;

   // Inject PLATFORM_ID pour détecter si le code s'exécute côté client ou serveur
   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Vérifie si c'est côté client
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startSlider(); // Lancer le slider uniquement si on est côté navigateur
    }
  }

  // Fonction pour démarrer le slider
  startSlider() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Changer de slide toutes les 3 secondes
  }

  // Changer de slide
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.comments.length;
    this.translateXValue = -this.currentIndex * 100; // Calculer la translation
  }

  // Nettoyer l'intervalle quand le composant est détruit
  ngOnDestroy(): void {
    if (this.isBrowser && this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
