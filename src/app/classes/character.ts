import { DeckModifier, PERK_LIST } from './deckModifier';
import { Deck } from './deck';

export class Character {
    public name: string;
    public hiddenName: string;
    public perkList: DeckModifier[];
    public negScenarioEffects: DeckModifier[];
    public negItemEffects: DeckModifier[];
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

        this.negScenarioEffects = new Array<DeckModifier>();
        this.negItemEffects = new Array<DeckModifier>();
        this.miscModifiers = new Array<DeckModifier>();
    }

    public applyModifiers() {
        this.ignoreNegItemEffects = this.ignoreNegScenarioEffects = false;

        this.deck.reset();
        this.applyModifierList(this.perkList);
        this.applyModifierList(this.miscModifiers);
        if (!this.ignoreNegScenarioEffects) { this.applyModifierList(this.negScenarioEffects); }
        if (!this.ignoreNegItemEffects) { this.applyModifierList(this.negItemEffects); }
    }

    private applyModifierList(modList: DeckModifier[]): void {
        Object.values(modList).forEach(perk => {
            Object.values(perk.uses).forEach(use => {
                if (use.used) { perk.set(this); }
            });
        });
    }
}
