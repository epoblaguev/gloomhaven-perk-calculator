import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProbabilityComponent } from './card-probability.component';

describe('CardProbabilityComponent', () => {
  let component: CardProbabilityComponent;
  let fixture: ComponentFixture<CardProbabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProbabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProbabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
