import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundResourceComponent } from './not-found-resource.component';

describe('NotFoundResourceComponent', () => {
  let component: NotFoundResourceComponent;
  let fixture: ComponentFixture<NotFoundResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
