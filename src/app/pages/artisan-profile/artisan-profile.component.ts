import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanSearchService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Artisan } from '../../models/artisan.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artisan-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artisan-profile.component.html',
  styleUrl: './artisan-profile.component.scss',
})
export class ArtisanProfileComponent implements OnInit {
  artisan: Artisan | undefined;

  contactName: string = '';
  contactEmail: string = '';
  contactMessage: string = '';

  sendMessage(form: any) {
    if (!this.artisan) return;

    // Objet pour l'email
    const emailData = {
      toEmail: this.artisan.email,
      fromName: this.contactName,
      fromEmail: this.contactEmail,
      messageContent: this.contactMessage
    };

    // Requête POST vers ton backend Node.js
    this.http.post('http://localhost:3000/send-email', emailData)
      .subscribe(
        response => {
          console.log('Email envoyé avec succès', response);
          form.resetForm(); // Réinitialiser le formulaire après l'envoi
        },
        error => {
          console.error('Erreur lors de l\'envoi de l\'email', error);
        }
      );
  }
  

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanSearchService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArtisanDetails(id);
    }
  }

  loadArtisanDetails(id: string): void {
    this.artisanService.getArtisanById(id).subscribe((artisan) => {
      this.artisan = artisan;
    });
  }
}
