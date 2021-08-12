import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsByUserComponent } from './topics-by-user.component';

describe('TopicsByUserComponent', () => {
  let component: TopicsByUserComponent;
  let fixture: ComponentFixture<TopicsByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
