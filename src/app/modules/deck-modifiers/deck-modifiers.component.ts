import { Component, OnInit, DoCheck } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { NEG_SCENARIO_EFFECTS_LIST, DeckModifier, NEG_ITEM_EFFECTS_LIST, MISC_MODIFIERS_LIST } from 'src/app/classes/deckModifier';
import Utils from 'src/app/classes/utils';
import { Character } from 'src/app/classes/character';
import { StorageService } from 'src/app/services/storage.service';

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
  counts = {
    bless: 0,
    curse: 0,
    'scenario-1': 0,
    'item-1': 0,
    'item-1_remove': 0,
  };

  private prevCharacter: Character;

  constructor(public charServ: CharacterService, public storageService: StorageService) {
    const char = charServ.getCharacter();
    this.prevCharacter = Utils.clone(char);
    this.counts.bless = char.miscModifiers.find(mod => mod.name === 'Bless').uses.length;
    this.counts.curse = char.negScenarioEffects.find(mod => mod.name === 'Curse').uses.length;
    this.counts['scenario-1'] = char.negScenarioEffects.find(mod => mod.name === '-1').uses.length;
    this.counts['item-1'] = char.negItemEffects.find(mod => mod.name === '-1').uses.length;
    this.counts['item-1_remove'] = char.negItemEffects.find(mod => mod.name === '-1_remove').uses.length;
    console.log(this.counts);
    console.log('Constructed Deck Modifiers');
  }

  ngOnInit() {
    this.updateDropdowns();
  }

  ngDoCheck() {
    if (!Utils.equals(this.charServ.getCharacter(), this.prevCharacter)) {
      this.updateDropdowns();
    }
  }

  private updateDropdowns() {
    this.prevCharacter = Utils.clone(this.charServ.getCharacter());
    const char = this.charServ.getCharacter();
    this.modifiers.bless = this.getModUses(char.miscModifiers.find(mod => mod.name === 'Bless'));
    this.modifiers.curse = this.getModUses(char.negScenarioEffects.find(mod => mod.name === 'Curse'));
    this.modifiers['scenario-1'] = this.getModUses(char.negScenarioEffects.find(mod => mod.name === '-1'));
    this.modifiers['item-1'] = this.getModUses(char.negItemEffects.find(mod => mod.name === '-1'));
  }

  private getModUses(modifier: DeckModifier): number {
    return modifier.uses.filter(use => use.used).length;
  }

  selectionChange() {
    const char = this.charServ.getCharacter();
    char.negScenarioEffects.length = 0;
    char.negItemEffects.length = 0;
    char.miscModifiers.length = 0;

    char.negScenarioEffects.push(new DeckModifier('Curse', this.modifiers.curse, NEG_SCENARIO_EFFECTS_LIST.Curse, true));
    char.negScenarioEffects.push(new DeckModifier('-1', this.modifiers['scenario-1'], NEG_SCENARIO_EFFECTS_LIST['-1'], true));
    // tslint:disable-next-line:max-line-length
    char.negItemEffects.push(new DeckModifier('-1', Math.abs(this.modifiers['item-1']), this.modifiers['item-1'] > 0 ? NEG_ITEM_EFFECTS_LIST['-1'] : NEG_ITEM_EFFECTS_LIST['-1_remove'], true));
    char.miscModifiers.push(new DeckModifier('Bless', this.modifiers.bless, MISC_MODIFIERS_LIST.Bless, true));
    char.applyModifiers();
    this.prevCharacter = Utils.clone(this.charServ.getCharacter());
    this.storageService.saveAllMods(char);
  }

  public dropdownValue(num: number, cardName: string): string {
    if (num === 0) {
      return 'None';
    } else if (num < 0) {
      return `Remove ${Math.abs(num)} ${cardName} cards`;
    } else {
      return `Add ${num} ${cardName} cards`;
    }
  }

}
