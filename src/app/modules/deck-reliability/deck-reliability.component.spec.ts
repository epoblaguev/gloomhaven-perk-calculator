import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckReliabilityComponent } from './deck-reliability.component';

describe('DeckReliabilityComponent', () => {
  let component: DeckReliabilityComponent;
  let fixture: ComponentFixture<DeckReliabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckReliabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckReliabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
