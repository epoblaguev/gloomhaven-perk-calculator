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

/*
export class Cragheart extends Character {
    name = 'Cragheart';
    perkList = [
        new Perk('Remove four (+0) cards', 1,
            (deck: Deck) => { deck.cards['+0'] -= 4; },
            (deck: Deck) => { deck.cards['+0'] += 4; }),
        new Perk('Replace one (-1) card with one (+1) card', 3,
            (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }),
        new Perk('Add one (-2) card and two (+2) cards', 1,
            (deck: Deck) => { deck.cards['-2'] += 1; deck.cards['+2'] += 2; },
            (deck: Deck) => { deck.cards['-2'] -= 1; deck.cards['+2'] -= 2; }),
        new Perk('Add one (+1) IMMOBILIZE card', 2,
            (deck: Deck) => { deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['+1'] -= 1; }),
        new Perk('Add one (+2) MUDDLE card', 2,
            (deck: Deck) => { deck.cards['+2'] += 1; },
            (deck: Deck) => { deck.cards['+2'] -= 1; })
    ];
}

export class Scoundrel extends Character {
    name = 'Scoundrel';
    perkList = [
        new Perk('Remove two (-1) cards', 2,
            (deck: Deck) => { deck.cards['-1'] -= 2; },
            (deck: Deck) => { deck.cards['-1'] += 2; }),
        new Perk('Remove four (+0) cards', 1,
            (deck: Deck) => { deck.cards['+0'] -= 4; },
            (deck: Deck) => { deck.cards['+0'] += 4; }),
        new Perk('Replace one (-2) with one (+0) card', 1,
            (deck: Deck) => { deck.cards['-2'] -= 1; deck.cards['+0'] += 1; },
            (deck: Deck) => { deck.cards['-2'] += 1; deck.cards['+0'] -= 1; }),
        new Perk('Replace one (-1) card with one (+1) card', 1,
            (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }),
        new Perk('Replace one (+0) card with one (+2) card', 2,
            (deck: Deck) => { deck.cards['+0'] -= 1; deck.cards['+2'] += 1; },
            (deck: Deck) => { deck.cards['+0'] += 1; deck.cards['+2'] -= 1; })
    ];
}

export class Brute extends Character {
    name = 'Brute';
    perkList = [
        new Perk('Remove two (-1) cards', 1,
            (deck: Deck) => { deck.cards['-1'] -= 2; },
            (deck: Deck) => { deck.cards['-1'] += 2; }),
        new Perk('Replace one (-1) card with one (+1) card', 1,
            (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }),
        new Perk('Add two (+1) cards', 2,
            (deck: Deck) => { deck.cards['+1'] += 2; },
            (deck: Deck) => { deck.cards['+1'] -= 2; }),
        new Perk('Add one (+3) card', 1,
            (deck: Deck) => { deck.cards['+3'] += 1; },
            (deck: Deck) => { deck.cards['+3'] -= 1; }),
        new Perk('Ignore negative item effects and add one (+1) card', 1,
            (deck: Deck) => { deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['+1'] -= 1; })
    ];
}

export class Spellweaver extends Character {
    name = 'Spellweaver';
    perkList = [
        new Perk('Remove four (+0) cards', 1,
            (deck: Deck) => { deck.cards['+0'] -= 4; },
            (deck: Deck) => { deck.cards['+0'] += 4; }),
        new Perk('Replace one (-1) card with one (+1) card', 2,
            (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }),
        new Perk('Add two (+1) cards', 2,
            (deck: Deck) => { deck.cards['+1'] += 2; },
            (deck: Deck) => { deck.cards['+1'] -= 2; }),
        new Perk('Add one (+0) STUN card', 1,
            (deck: Deck) => { deck.cards['+0'] += 1; },
            (deck: Deck) => { deck.cards['+0'] -= 1; }),
        new Perk('Add one (+1) WOUND card', 1,
            (deck: Deck) => { deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['+1'] -= 1; }),
        new Perk('Add one (+1) IMMOBILIZE card', 1,
            (deck: Deck) => { deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['+1'] -= 1; }),
        new Perk('Add one (+1) CURSE card', 1,
            (deck: Deck) => { deck.cards['+1'] += 1; },
            (deck: Deck) => { deck.cards['+1'] -= 1; }),
        new Perk('Add one (+2) FIRE card', 2,
            (deck: Deck) => { deck.cards['+2'] += 1; },
            (deck: Deck) => { deck.cards['+2'] -= 1; }),
        new Perk('Add one (+2) FROST card', 2,
            (deck: Deck) => { deck.cards['+2'] += 1; },
            (deck: Deck) => { deck.cards['+2'] -= 1; }),
    ];
}
*/
