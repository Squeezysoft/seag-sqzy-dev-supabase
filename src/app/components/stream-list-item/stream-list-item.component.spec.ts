import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamListItemComponent } from './stream-list-item.component';

describe('StreamListItemComponent', () => {
  let component: StreamListItemComponent;
  let fixture: ComponentFixture<StreamListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StreamListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
