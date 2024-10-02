import { TestBed } from '@angular/core/testing';

import { ArtisanMethodsService } from './artisan-methods.service';

describe('ArtisanMethodsService', () => {
  let service: ArtisanMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtisanMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
