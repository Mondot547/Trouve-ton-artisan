import { Component, Input, OnInit } from '@angular/core';
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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    private http: HttpClient,
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
      ],
      contactMessage: ['', [Validators.required, Validators.minLength(10)]],
    });

    // Charger les détails de l'artisan si l'ID est présent dans l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArtisanDetails(id);
    }
  }

  sendMessage() {
    if (this.form.invalid || !this.artisan) return;

    // Vérifier la validité du formulaire avant l'envoi
    if (this.form.invalid) {
      this.modalMessage = 'Veuillez remplir tous les champs correctement.';
      this.isSuccess = false;
      this.showModal = true;
      this.closeModalAfterDelay();
      return;
    }

    // Objet pour l'email
    const emailData = {
      toEmail: this.artisan.email,
      fromName: this.form.value.contactName,
      fromEmail: this.form.value.contactEmail,
      subject: this.form.value.subject,
      messageContent: this.form.value.contactMessage,
    };

    // Requête POST vers le backend
    this.http.post('http://localhost:3000/send-email', emailData).subscribe(
      (response) => {
        this.isSuccess = true;
        this.modalMessage = 'Email envoyé avec succès !';
        this.showModal = true;
        this.form.reset(); // Réinitialiser le formulaire après l'envoi
        this.closeModalAfterDelay();
      },
      (err: HttpErrorResponse) => {
        this.isSuccess = false;
        this.modalMessage =
          "Une Erreur est survenue lors de l'envoi de l'email !";
        console.error("Erreur lors de l'envoi de l'email", err);
        alert(
          "Erreur lors de l'envoi de l'email : " +
            err.error.errors.map((error: any) => error.msg).join(', ')
        );
        this.showModal = true;
        this.closeModalAfterDelay();
      }
    );
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
