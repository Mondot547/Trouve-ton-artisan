import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanSearchService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Artisan } from '../../models/artisan.model';

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

  sendMessage() {
    console.log('Nom:', this.contactName);
    console.log('Email:', this.contactEmail);
    console.log('Message:', this.contactMessage);
  }

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanSearchService
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
