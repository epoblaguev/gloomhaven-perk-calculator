import { Perk, PERK_LIST } from './perk';
import { Deck } from './deck';

export class Character {
    name: string;
    hiddenName: string;
    perkList = new Array<Perk>();

    constructor(characterJson) {
        this.name = characterJson.name;
        this.hiddenName = characterJson.hidden_name;
        for (const perk of characterJson.perks) {
            console.log(perk.name);
            const perkFuncs = PERK_LIST[perk.name];
            this.perkList.push(new Perk(perk.name, perk.uses, perkFuncs.set, perkFuncs.unset));
        }
    }
}
