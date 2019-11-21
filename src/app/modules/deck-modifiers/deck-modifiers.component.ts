import { Component, OnInit, DoCheck } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { NEG_SCENARIO_EFFECTS_LIST, DeckModifier, NEG_ITEM_EFFECTS_LIST, MISC_MODIFIERS_LIST } from 'src/app/classes/deckModifier';
import Utils from 'src/app/classes/utils';
import { Character } from 'src/app/classes/character';

@Component({
  selector: 'app-deck-modifiers',
  templateUrl: './deck-modifiers.component.html',
  styleUrls: ['./deck-modifiers.component.scss']
})
export class DeckModifiersComponent implements OnInit, DoCheck {
  modifiers = {
    bless: 0,
    curse: 0,
    'scenario-1': 0,
    'item-1': 0
  };

  private prevCharacter: Character;

  constructor(public charServ: CharacterService) {
    this.prevCharacter = Utils.clone(this.charServ.getCharacter());
  }

  ngOnInit() {
  }

  ngDoCheck() {
    if (!Utils.equals(this.charServ.getCharacter(), this.prevCharacter)) {
      this.prevCharacter = Utils.clone(this.charServ.getCharacter());
      const char = this.charServ.getCharacter();
      this.modifiers.bless = this.getModUses(char.miscModifiers.filter(mod => mod.name === 'Bless'));
      this.modifiers.curse = this.getModUses(char.negScenarioEffects.filter(mod => mod.name === 'Curse'));
      this.modifiers['scenario-1'] = this.getModUses(char.negScenarioEffects.filter(mod => mod.name === '-1'));
      this.modifiers['item-1'] = this.getModUses(char.negItemEffects.filter(mod => mod.name === '-1'));
    }
  }

  private getModUses(modifiers: DeckModifier[]): number {
    let sum = 0;
    modifiers.forEach(mod => {
      sum += mod.uses.length;
    });
    return sum;
  }

  selectionChange() {
    const char = this.charServ.getCharacter();
    char.negScenarioEffects.length = 0;
    char.negItemEffects.length = 0;
    char.miscModifiers.length = 0;

    char.negScenarioEffects.push(new DeckModifier('Curse', this.modifiers.curse, NEG_SCENARIO_EFFECTS_LIST.Curse, true));
    char.negScenarioEffects.push(new DeckModifier('-1', this.modifiers['scenario-1'], NEG_SCENARIO_EFFECTS_LIST['-1'], true));
    char.negItemEffects.push(new DeckModifier('-1', this.modifiers['item-1'], NEG_ITEM_EFFECTS_LIST['-1'], true));
    char.miscModifiers.push(new DeckModifier('Bless', this.modifiers.bless, MISC_MODIFIERS_LIST.Bless, true));
    char.applyModifiers();
    this.prevCharacter = Utils.clone(this.charServ.getCharacter());
  }

}
