import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyDetailComponent } from './reply-detail.component';

describe('ReplyDetailComponent', () => {
  let component: ReplyDetailComponent;
  let fixture: ComponentFixture<ReplyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
