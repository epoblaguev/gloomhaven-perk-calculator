import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { NEG_SCENARIO_EFFECTS_LIST, DeckModifier, NEG_ITEM_EFFECTS_LIST, POS_SCENARIO_EFFECTS_LIST, POS_ITEM_EFFECTS_LIST } from 'src/app/classes/deckModifier';
import { Character } from 'src/app/classes/character';
import { StorageService } from 'src/app/services/storage.service';
import { FaIcons } from 'src/app/classes/consts';
import * as Utils from 'src/app/classes/utils';

@Component({
  selector: 'app-deck-modifiers',
  templateUrl: './deck-modifiers.component.html',
  styleUrls: ['./deck-modifiers.component.scss']
})
export class DeckModifiersComponent implements OnInit, DoCheck {
  public itemEffectsCount = 0;
  public modifiers = {
    bless: 0,
    curse: 0,
    'scenario-1': 0,
    'item-1': 0,
    'item-1_remove': 0,
  };
  public counts = {
    bless: 0,
    curse: 0,
    'scenario-1': 0,
    'item-1': 0,
    'item-1_remove': 0,
  };
  public countArrays = {
    bless: [],
    curse: [],
    'scenario-1': [],
    'items-1': []
  };

  public faIcons = FaIcons;
  public math = Math;

  @Input() character: Character;
  private prevCharacter: Character;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.counts.bless = this.character.posScenarioEffects.find(mod => mod.name === 'Bless').uses.length;
    this.counts.curse = this.character.negScenarioEffects.find(mod => mod.name === 'Curse').uses.length;
    this.counts['scenario-1'] = this.character.negScenarioEffects.find(mod => mod.name === '-1').uses.length;
    this.counts['item-1'] = this.character.negItemEffects.find(mod => mod.name === '-1').uses.length;
    this.counts['item-1_remove'] = this.character.posItemEffects.find(mod => mod.name === '-1').uses.length;

    this.countArrays.bless = Array(this.counts.bless + 1);
    this.countArrays.curse = Array(this.counts.curse + 1);
    this.countArrays['scenario-1'] = Array(this.counts['scenario-1'] + 1);
    this.countArrays['items-1'] = Array(this.counts['item-1'] + this.counts['item-1_remove'] + 1);

    this.updateDropdowns();
  }

  ngDoCheck() {
    if (!Utils.equals(this.character, this.prevCharacter)) {
      this.updateDropdowns();
    }
  }

  private updateDropdowns() {
    this.prevCharacter = Utils.clone(this.character);

    this.modifiers.bless = this.getModUses(this.character.posScenarioEffects.find(mod => mod.name === 'Bless'));
    this.modifiers.curse = this.getModUses(this.character.negScenarioEffects.find(mod => mod.name === 'Curse'));
    this.modifiers['scenario-1'] = this.getModUses(this.character.negScenarioEffects.find(mod => mod.name === '-1'));
    this.modifiers['item-1'] = this.getModUses(this.character.negItemEffects.find(mod => mod.name === '-1'));
    this.modifiers['item-1_remove'] = this.getModUses(this.character.posItemEffects.find(mod => mod.name === '-1'));


    const negItemEffects = this.character.negItemEffects.find(mod => mod.name === '-1').uses.filter(use => use.used);
    const postItemEffects = this.character.posItemEffects.find(mod => mod.name === '-1').uses.filter(use => use.used);
    this.itemEffectsCount = negItemEffects.length - postItemEffects.length;
  }

  private getModUses(modifier: DeckModifier): number {
    return modifier.uses.filter(use => use.used).length;
  }

  selectionChange() {
    const char = this.character;
    char.negScenarioEffects.length = 0;
    char.negItemEffects.length = 0;
    char.posItemEffects.length = 0;
    char.posScenarioEffects.length = 0;

    char.negScenarioEffects.push(new DeckModifier('Curse', this.modifiers.curse, NEG_SCENARIO_EFFECTS_LIST.Curse, true));
    char.negScenarioEffects.push(new DeckModifier('-1', this.modifiers['scenario-1'], NEG_SCENARIO_EFFECTS_LIST['-1'], true));
    char.posScenarioEffects.push(new DeckModifier('Bless', this.modifiers.bless, POS_SCENARIO_EFFECTS_LIST.Bless, true));

    if (this.itemEffectsCount > 0) {
      char.negItemEffects.push(new DeckModifier('-1', this.itemEffectsCount, NEG_ITEM_EFFECTS_LIST['-1'], true));
      char.posItemEffects = Object.entries(POS_ITEM_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 5, value));
    } else if (this.itemEffectsCount < 0) {
      char.posItemEffects.push(new DeckModifier('-1', Math.abs(this.itemEffectsCount), POS_ITEM_EFFECTS_LIST['-1'], true));
      char.negItemEffects = Object.entries(NEG_ITEM_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 5, value));
    }

    // console.log(this.itemEffectsCount);

    char.applyModifiers();
    this.prevCharacter = Utils.clone(char);
    this.storageService.saveAllMods(char);
    // console.log(char);
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
