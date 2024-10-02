import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ArtisanService } from './artisan.service';

describe('ArtisanService', () => {
  let service: ArtisanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtisanService],
    });
    service = TestBed.inject(ArtisanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
