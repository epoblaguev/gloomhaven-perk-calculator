import { Perk, PERK_LIST } from './perk';
import { Deck } from './deck';

export class Character {
    public name: string;
    public hiddenName: string;
    public perkList: Array<Perk>;
    public deck: Deck;
    public compareDeck: Deck;

    constructor(characterJson) {
        this.name = characterJson.name;
        this.hiddenName = characterJson.hidden_name;
        this.deck = new Deck();

        this.perkList = new Array<Perk>();
        for (const perk of characterJson.perks) {
            const perkFuncs = PERK_LIST[perk.name];
            this.perkList.push(new Perk(perk.name, perk.uses, perkFuncs.set));
        }
    }
}
