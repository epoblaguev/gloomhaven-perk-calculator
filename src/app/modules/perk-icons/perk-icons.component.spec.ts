import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkIconsComponent } from './perk-icons.component';
import { PERK_LIST } from 'src/app/classes/deckModifier';

describe('PerkIconsComponent', () => {
  let component: PerkIconsComponent;
  let fixture: ComponentFixture<PerkIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerkIconsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkIconsComponent);
    component = fixture.componentInstance;
    component.icon = '(-1)';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support all words in "supportedWords" array (except numbers)', () => {
    PerkIconsComponent.supportedWords.forEach(word => {
      if (!word.startsWith('(')) {
        expect(component.iconMap.hasOwnProperty(word)).toBeTruthy(`"${word}" is not in list of iconMap`);
      }
    });
  });

  it('should have all iconMap keys present in "supportedWords" array', () => {
    Object.keys(component.iconMap).forEach(key => {
      expect(PerkIconsComponent.supportedWords.has(key)).toBeTruthy(`"${key}" is not in list of supported words`);
    });
  });

  it('should support all available (+X) and (-X) cards', () => {
    const regex = /\([-+]\d\)/gm;
    Object.keys(PERK_LIST).forEach(perk => {
      perk.match(regex)?.forEach(match => {
        expect(PerkIconsComponent.supportedWords.has(match)).toBeTruthy(`${match} not in supported words`);
      });
    });
  });
});
