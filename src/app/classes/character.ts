import { DeckModifier, PERK_LIST, MISC_MODIFIERS_LIST, NEG_SCENARIO_EFFECTS_LIST, NEG_ITEM_EFFECTS_LIST, POS_ITEM_EFFECTS_LIST, } from './deckModifier';
import { Deck } from './deck';

export class Character {
    public name: string;
    public hiddenName: string;
    public perkList: DeckModifier[];
    public negScenarioEffects: DeckModifier[];
    public negItemEffects: DeckModifier[];
    public posItemEffects: DeckModifier[];
    public miscModifiers: DeckModifier[];
    public deck: Deck;
    public compareDeck: Deck;
    public ignoreNegItemEffects: boolean;
    public ignoreNegScenarioEffects: boolean;

    constructor(characterJson) {
        this.name = characterJson.name;
        this.hiddenName = characterJson.hidden_name;
        this.deck = new Deck();
        this.ignoreNegItemEffects = this.ignoreNegScenarioEffects = false;

        this.perkList = new Array<DeckModifier>();
        for (const perk of characterJson.perks) {
            const perkFuncs = PERK_LIST[perk.name];
            this.perkList.push(new DeckModifier(perk.name, perk.uses, perkFuncs));
        }

        this.negScenarioEffects = Object.entries(NEG_SCENARIO_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 10, value));
        this.negItemEffects = Object.entries(NEG_ITEM_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 10, value));
        this.posItemEffects = Object.entries(POS_ITEM_EFFECTS_LIST).map(([key, value]) => new DeckModifier(key, 5, value));
        this.miscModifiers = Object.entries(MISC_MODIFIERS_LIST).map(([key, value]) => new DeckModifier(key, 10, value));
    }

    public applyModifiers() {
        this.ignoreNegItemEffects = this.ignoreNegScenarioEffects = false;

        this.deck.reset();
        this.applyModifierList(this.perkList);
        this.applyModifierList(this.miscModifiers);
        this.applyModifierList(this.posItemEffects);
        if (!this.ignoreNegScenarioEffects) { this.applyModifierList(this.negScenarioEffects); }
        if (!this.ignoreNegItemEffects) { this.applyModifierList(this.negItemEffects); }
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
