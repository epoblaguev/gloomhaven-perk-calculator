import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckModifiersComponent } from './deck-modifiers.component';

describe('DeckModifiersComponent', () => {
  let component: DeckModifiersComponent;
  let fixture: ComponentFixture<DeckModifiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckModifiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
