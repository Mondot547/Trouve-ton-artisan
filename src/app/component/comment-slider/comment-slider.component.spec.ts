import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSliderComponent } from './comment-slider.component';

describe('CommentSliderComponent', () => {
  let component: CommentSliderComponent;
  let fixture: ComponentFixture<CommentSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
