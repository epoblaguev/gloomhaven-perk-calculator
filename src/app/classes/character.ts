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

    constructor(characterJson) {
        this.name = characterJson.name;
        this.hiddenName = characterJson.hidden_name;
        this.deck = new Deck();

        this.perkList = new Array<DeckModifier>();
        for (const perk of characterJson.perks) {
            const perkFuncs = PERK_LIST[perk.name];
            this.perkList.push(new DeckModifier(perk.name, perk.uses, perkFuncs.set));
        }

        this.negScenarioEffects = new Array<DeckModifier>();
        this.negItemEffects = new Array<DeckModifier>();
        this.miscModifiers = new Array<DeckModifier>();
    }

    public applyModifiers() {
        this.deck.applyPerks(this.perkList);
        this.deck.applyPerks(this.negScenarioEffects, false);
        this.deck.applyPerks(this.negItemEffects, false);
        this.deck.applyPerks(this.miscModifiers, false);
    }
}
