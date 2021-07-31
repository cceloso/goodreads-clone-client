import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsByUserComponent } from './reviews-by-user.component';

describe('ReviewsByUserComponent', () => {
  let component: ReviewsByUserComponent;
  let fixture: ComponentFixture<ReviewsByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
