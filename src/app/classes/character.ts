import { DeckModifier, PERK_LIST, POS_SCENARIO_EFFECTS_LIST, NEG_SCENARIO_EFFECTS_LIST, NEG_ITEM_EFFECTS_LIST, POS_ITEM_EFFECTS_LIST, } from './deckModifier';
import { Deck } from './deck';

export class Character {
  public name: string;
  public hiddenName: string;
  public gameName: string;
  public perkList: DeckModifier[];
  public negScenarioEffects: DeckModifier[];
  public negItemEffects: DeckModifier[];
  public posItemEffects: DeckModifier[];
  public posScenarioEffects: DeckModifier[];
  public deck: Deck;
  public compareDeck: Deck;
  public ignoreNegItemEffects: boolean;
  public ignorePosItemEffects: boolean;
  public ignoreNegScenarioEffects: boolean;
  public ignorePosScenarioEffects: boolean;
  public icon: string;

  constructor(characterJson) {
    this.name = characterJson.name;
    this.hiddenName = characterJson.hidden_name;
    this.gameName = characterJson.from_game;
    this.deck = new Deck();
    this.ignoreNegItemEffects = this.ignoreNegScenarioEffects = this.ignorePosScenarioEffects = this.ignorePosItemEffects = false;
    this.icon = characterJson.icon;

    this.perkList = new Array<DeckModifier>();
    for (const perk of characterJson.perks) {
      const perkFuncs = PERK_LIST[perk.name];
      this.perkList.push(new DeckModifier(perk.name, perk.uses, perkFuncs));
    }

    this.negScenarioEffects = Object.entries(NEG_SCENARIO_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 10, value));
    this.negItemEffects = Object.entries(NEG_ITEM_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 10, value));
    this.posItemEffects = Object.entries(POS_ITEM_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 5, value));
    this.posScenarioEffects = Object.entries(POS_SCENARIO_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 10, value));
  }

  public applyModifiers() {
    this.ignoreNegItemEffects = this.ignoreNegScenarioEffects = this.ignorePosScenarioEffects = this.ignorePosItemEffects = false;

    this.deck.reset();
    this.applyModifierList(this.perkList);
    if (!this.ignoreNegScenarioEffects) { this.applyModifierList(this.negScenarioEffects); }
    if (!this.ignorePosScenarioEffects) { this.applyModifierList(this.posScenarioEffects); }
    if (!this.ignoreNegItemEffects) { this.applyModifierList(this.negItemEffects); }
    if (!this.ignorePosItemEffects) { this.applyModifierList(this.posItemEffects); }
    Object.keys(this.deck.cards).forEach(key => {
      if (this.deck.cards[key] < 0) {
        this.deck.cards[key] = 0;
      }
    });
  }

  private applyModifierList(modList: DeckModifier[]): void {
    Object.values(modList).forEach(perk => {
      Object.values(perk.uses).forEach(use => {
        if (use.used) { perk.applyToCharacter(this); }
      });
    });
  }
}
