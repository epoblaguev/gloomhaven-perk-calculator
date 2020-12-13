import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Character } from 'src/app/classes/character';

import { PerkLabelComponent } from './perk-label.component';

describe('PerkLabelComponent', () => {
  let component: PerkLabelComponent;
  let fixture: ComponentFixture<PerkLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerkLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkLabelComponent);
    component = fixture.componentInstance;
    component.perk = {
      name: 'Test Perk',
      uses: [{used: true}, {used: false}],
      applyToCharacter: (character: Character) => {}
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
