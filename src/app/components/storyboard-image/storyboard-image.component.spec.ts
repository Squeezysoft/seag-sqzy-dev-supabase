import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryboardImageComponent } from './storyboard-image.component';

describe('StoryboardImageComponent', () => {
  let component: StoryboardImageComponent;
  let fixture: ComponentFixture<StoryboardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryboardImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoryboardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
