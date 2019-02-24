import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEffectsComponent } from './card-effects.component';

describe('CardEffectsComponent', () => {
  let component: CardEffectsComponent;
  let fixture: ComponentFixture<CardEffectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEffectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
