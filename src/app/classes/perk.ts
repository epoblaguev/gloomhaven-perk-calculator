import { Deck } from './deck';

export class Perk {
    name: string;
    uses: number;
    set: (deck: Deck) => void;
    unset: (deck: Deck) => void;

    constructor(name: string, uses: number, set: (deck: Deck) => void, unset: (deck: Deck) => void) {
        this.name = name;
        this.uses = uses;
        this.set = set;
        this.unset = unset;
    }
}

export const PERK_LIST = {
    'Add one (+0) ADD TARGET card': {
        set: (deck: Deck) => { deck.cards['+0'] += 1; },
        unset: (deck: Deck) => { deck.cards['+0'] -= 1; }
    },
    'Add one (+0) STUN card': {
        set: (deck: Deck) => { deck.cards['+0'] += 1; },
        unset: (deck: Deck) => { deck.cards['+0'] -= 1; }
    },
    'Add one (+1) CURSE card': {
        set: (deck: Deck) => { deck.cards['+1'] += 1; },
        unset: (deck: Deck) => { deck.cards['+1'] -= 1; }
    },
    'Add one (+1) HEAL card': {
        set: (deck: Deck) => { deck.cards['+1'] += 1; },
        unset: (deck: Deck) => { deck.cards['+1'] -= 1; }
    },
    'Add one (+1) IMMOBILIZE card': {
        set: (deck: Deck) => { deck.cards['+1'] += 1; },
        unset: (deck: Deck) => { deck.cards['+1'] -= 1; }
    },
    'Add one (+1) WOUND card': {
        set: (deck: Deck) => { deck.cards['+1'] += 1; },
        unset: (deck: Deck) => { deck.cards['+1'] -= 1; }
    },
    'Add one (+2) FIRE card': {
        set: (deck: Deck) => { deck.cards['+2'] += 1; },
        unset: (deck: Deck) => { deck.cards['+2'] -= 1; }
    },
    'Add one (+2) FROST card': {
        set: (deck: Deck) => { deck.cards['+2'] += 1; },
        unset: (deck: Deck) => { deck.cards['+2'] -= 1; }
    },
    'Add one (+2) MUDDLE card': {
        set: (deck: Deck) => { deck.cards['+2'] += 1; },
        unset: (deck: Deck) => { deck.cards['+2'] -= 1; }
    },
    'Add one (+1) Shield 1 self card': {
        set: (deck: Deck) => { deck.cards['+1'] += 1; },
        unset: (deck: Deck) => { deck.cards['+1'] -= 1; }
    },
    'Add one (+3) card': {
        set: (deck: Deck) => { deck.cards['+3'] += 1; },
        unset: (deck: Deck) => { deck.cards['+3'] -= 1; }
    },
    'Add one (-2) card and two (+2) cards': {
        set: (deck: Deck) => { deck.cards['-2'] += 1; deck.cards['+2'] += 2; },
        unset: (deck: Deck) => { deck.cards['-2'] -= 1; deck.cards['+2'] -= 2; }
    },
    'Add two (+1) cards': {
        set: (deck: Deck) => { deck.cards['+1'] += 2; },
        unset: (deck: Deck) => { deck.cards['+1'] -= 2; }
    },
    'Add two rolling (+1) cards': {
        set: (deck: Deck) => { deck.cards['r+1'] += 2; },
        unset: (deck: Deck) => { deck.cards['r+1'] -= 2; }
    },
    'Ignore negative item effects and add one (+1) card': {
        set: (deck: Deck) => { deck.cards['+1'] += 1; },
        unset: (deck: Deck) => { deck.cards['+1'] -= 1; }
    },
    'Remove four (+0) cards': {
        set: (deck: Deck) => { deck.cards['+0'] -= 4; },
        unset: (deck: Deck) => { deck.cards['+0'] += 4; }
    },
    'Remove two (-1) cards': {
        set: (deck: Deck) => { deck.cards['-1'] -= 2; },
        unset: (deck: Deck) => { deck.cards['-1'] += 2; }
    },
    'Replace one (+0) card with one (+2) card': {
        set: (deck: Deck) => { deck.cards['+0'] -= 1; deck.cards['+2'] += 1; },
        unset: (deck: Deck) => { deck.cards['+0'] += 1; deck.cards['+2'] -= 1; }
    },
    'Replace one (-1) card with one (+1) card': {
        set: (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
        unset: (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }
    },
    'Replace one (-2) card with one (+0) card': {
        set: (deck: Deck) => { deck.cards['-2'] -= 1; deck.cards['+0'] += 1; },
        unset: (deck: Deck) => { deck.cards['-2'] += 1; deck.cards['+0'] -= 1; }
    },
    'Replace two (+1) cards with two (+2) cards': {
        set: (deck: Deck) => { deck.cards['+1'] -= 2; deck.cards['+2'] += 2; },
        unset: (deck: Deck) => { deck.cards['+1'] += 2; deck.cards['+2'] -= 2; }
    }
};
