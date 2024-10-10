import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanSearchService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Artisan } from '../../models/artisan.model';
import { RatingStarsComponent } from '../../component/rating-stars/rating-stars.component';

@Component({
  selector: 'app-artisan-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingStarsComponent,
  ],
  templateUrl: './artisan-profile.component.html',
  styleUrls: ['./artisan-profile.component.scss'],
})
export class ArtisanProfileComponent implements OnInit {
  artisan: Artisan | undefined;
  form!: FormGroup; // Déclaration du formulaire réactif
  showModal = false;
  modalMessage: string = '';
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanSearchService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec le FormBuilder
    this.form = this.fb.group({
      contactName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactSubject: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ], // Ajout du sujet
      contactMessage: ['', [Validators.required, Validators.minLength(10)]],
    });

    // Charger les détails de l'artisan si l'ID est présent dans l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArtisanDetails(id);
    }
  }

  sendMessage() {
    if (!this.artisan) return;

    // Vérifier la validité du formulaire avant l'envoi
    if (this.form.invalid) {
      this.modalMessage = 'Veuillez remplir tous les champs correctement.';
      this.isSuccess = false;
      this.showModal = true;
      this.closeModalAfterDelay();
      return;
    }

    // Affichage des données dans la console
    const emailData = {
      toEmail: this.artisan.email,
      fromName: this.form.value.contactName,
      fromEmail: this.form.value.contactEmail,
      subject: this.form.value.contactSubject,
      messageContent: this.form.value.contactMessage,
    };

    console.log('Données du formulaire :', emailData);

    // Simuler un envoi d'email (ici, on va simuler un succès)
    // Dans une vraie application, ici tu ferais l'appel à un service d'email.
    this.simulateEmailSending(emailData);
  }

  simulateEmailSending(emailData: any) {
    // Simuler un délai de 1 seconde pour l'envoi
    setTimeout(() => {
      this.isSuccess = true; // Simuler un succès
      this.modalMessage = 'Email envoyé avec succès !'; // Message de succès
      this.showModal = true; // Affiche la modal
      this.form.reset(); // Réinitialiser le formulaire après l'envoi
      this.closeModalAfterDelay();
    }, 1000);
  }

  loadArtisanDetails(id: string): void {
    this.artisanService.getArtisanById(id).subscribe((artisan) => {
      this.artisan = artisan;
    });
  }

  closeModalAfterDelay() {
    setTimeout(() => {
      this.showModal = false;
    }, 3000);
  }
}
