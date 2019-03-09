import { Deck } from './deck';

export class Perk {
    name: string;
    uses: Array<{ used: boolean }>;
    set: (deck: Deck) => void;

    constructor(name: string, uses: number, set: (deck: Deck) => void) {
        this.name = name;
        this.uses = Array<{ used: boolean }>();

        for (let i = 0; i < uses; i++) {
            this.uses.push({ used: false });
        }
        this.set = set;
    }
}

export const PERK_LIST = {
    'Add one (-1) DARK card': {
        set: (deck: Deck) => { deck.addCard('-1', 'Dark', 1); },
        unset: (deck: Deck) => { deck.addCard('-1', 'Dark', -1); }
    },
    'Add one (+0) ADD TARGET card': {
        set: (deck: Deck) => { deck.addCard('+0', 'Add Target', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'Add Target', -1); }
    },
    'Add one (+0) STUN card': {
        set: (deck: Deck) => { deck.addCard('+0', 'Stun', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'Stun', -1); }
    },
    'Add one (+0) Refresh and item card': {
        set: (deck: Deck) => { deck.addCard('+0', 'Refresh an item', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'Refresh an item', -1); }
    },
    'Add one (+1) CURSE card': {
        set: (deck: Deck) => { deck.addCard('+1', 'Curse', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Curse', -1); },
    },
    'Add one (+1) HEAL 2 card': {
        set: (deck: Deck) => { deck.addCard('+1', 'Heal 2', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Heal 2', -1); },
    },
    'Add one (+1) IMMOBILIZE card': {
        set: (deck: Deck) => { deck.addCard('+1', 'Immobilize', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Immobilize', -1); },
    },
    'Add one (+1) INVISIBLE card': {
        set: (deck: Deck) => { deck.addCard('+1', 'Invisible', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Invisible', -1); },
    },
    'Add one (+1) WOUND card': {
        set: (deck: Deck) => { deck.addCard('+1', 'Wound', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Wound', -1); },
    },
    'Add one (+1) WIND card': {
        set: (deck: Deck) => { deck.addCard('+1', 'Wind', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Wind', -1); },
    },
    'Add one (+1) POISON card': {
        set: (deck: Deck) => { deck.addCard('+1', 'Poison', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Poison', -1); },
    },
    'Add one (+2) FIRE card': {
        set: (deck: Deck) => { deck.addCard('+2', 'Fire', 1); },
        unset: (deck: Deck) => { deck.addCard('+2', 'Fire', -1); },
    },
    'Add one (+2) FROST card': {
        set: (deck: Deck) => { deck.addCard('+2', 'Frost', 1); },
        unset: (deck: Deck) => { deck.addCard('+2', 'Frost', -1); },
    },
    'Add one (+2) MUDDLE card': {
        set: (deck: Deck) => { deck.addCard('+2', 'Muddle', 1); },
        unset: (deck: Deck) => { deck.addCard('+2', 'Muddle', -1); },
    },
    'Add one (+2) card': {
        set: (deck: Deck) => { deck.addCard('+2', 'None', 1); },
        unset: (deck: Deck) => { deck.addCard('+2', 'None', -1); },
    },
    'Add one (+1) Shield 1, Self card': {
        set: (deck: Deck) => { deck.addCard('+1', 'Shield 1, Self', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Shield 1, Self', -1); },
    },
    'Add one (+3) card': {
        set: (deck: Deck) => { deck.addCard('+3', 'None', 1); },
        unset: (deck: Deck) => { deck.addCard('+3', 'None', -1); },
    },
    'Add one (-2) card and two (+2) cards': {
        set: (deck: Deck) => { deck.addCard('-2', 'None', 1); deck.addCard('+2', 'None', 2); },
        unset: (deck: Deck) => { deck.addCard('-2', 'None', -1); deck.addCard('+2', 'None', -2); }
    },
    'Add one rolling (+1) DISARM card': {
        set: (deck: Deck) => { deck.addCard('r+1', 'Rolling Disarm', 1); },
        unset: (deck: Deck) => { deck.addCard('r+1', 'Rolling Disarm', -1); }
    },
    'Add one rolling (+2) card': {
        set: (deck: Deck) => { deck.cards['r+2'] += 1; },
        unset: (deck: Deck) => { deck.cards['r+2'] -= 1; }
    },
    'Add two (+1) cards': {
        set: (deck: Deck) => { deck.addCard('+1', 'None', 2); },
        unset: (deck: Deck) => { deck.addCard('+1', 'None', -2); }
    },
    'Add two (+1) PUSH 1 cards': {
        set: (deck: Deck) => { deck.addCard('+1', 'Push 1', 2); },
        unset: (deck: Deck) => { deck.addCard('+1', 'Push 1', -2); }
    },
    'Add two rolling (+1) cards': {
        set: (deck: Deck) => { deck.cards['r+1'] += 2; },
        unset: (deck: Deck) => { deck.cards['r+1'] -= 2; }
    },
    'Add three rolling (+1) cards': {
        set: (deck: Deck) => { deck.cards['r+1'] += 3; },
        unset: (deck: Deck) => { deck.cards['r+1'] -= 3; }
    },
    'Add three (+0) FIRE cards': {
        set: (deck: Deck) => { deck.addCard('+0', 'Fire', 3); },
        unset: (deck: Deck) => { deck.addCard('+0', 'Fire', -3); }
    },
    'Add three (+0) FROST cards': {
        set: (deck: Deck) => { deck.addCard('+0', 'Frost', 3); },
        unset: (deck: Deck) => { deck.addCard('+0', 'Frost', -3); }
    },
    'Add three (+0) WIND cards': {
        set: (deck: Deck) => { deck.addCard('+0', 'Wind', 3); },
        unset: (deck: Deck) => { deck.addCard('+0', 'Wind', -3); }
    },
    'Add three (+0) EARTH cards': {
        set: (deck: Deck) => { deck.addCard('+0', 'Earth', 3); },
        unset: (deck: Deck) => { deck.addCard('+0', 'Earth', -3); }
    },
    'Ignore negative scenario effects': {
        set: (deck: Deck) => { /* Do nothing */ },
        unset: (deck: Deck) => { /* Do nothing */ }
    },
    'Ignore negative item effects': {
        set: (deck: Deck) => { /* Do nothing */ },
        unset: (deck: Deck) => { /* Do nothing */ }
    },
    'Ignore negative item effects and add one (+1) card': {
        set: (deck: Deck) => { deck.addCard('+1', 'None', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'None', -1); }
    },
    'Ignore negative item effects and add two (+1) cards': {
        set: (deck: Deck) => { deck.addCard('+1', 'None', 2); },
        unset: (deck: Deck) => { deck.addCard('+1', 'None', -2); }
    },
    'Remove four (+0) cards': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -4); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 4); }
    },
    'Remove two (-1) cards': {
        set: (deck: Deck) => { deck.addCard('-1', 'None', -2); },
        unset: (deck: Deck) => { deck.addCard('-1', 'None', 2); }
    },
    'Remove one (-2) card': {
        set: (deck: Deck) => { deck.addCard('-2', 'None', -1); },
        unset: (deck: Deck) => { deck.addCard('-2', 'None', 1); }
    },
    'Replace one (-1) DARK card with one (+1) DARK card': {
        set: (deck: Deck) => { deck.addCard('-1', 'Dark', -1); deck.addCard('+1', 'Dark', 1); },
        unset: (deck: Deck) => { deck.addCard('-1', 'Dark', 1); deck.addCard('+1', 'Dark', -1); }
    },
    'Replace one (-1) card with one (+0) STUN card': {
        set: (deck: Deck) => { deck.addCard('-1', 'None', -1); deck.addCard('+0', 'Stun', 1); },
        unset: (deck: Deck) => { deck.addCard('-1', 'None', 1); deck.addCard('+0', 'Stun', -1); }
    },
    'Replace one (+0) card with one (+2) card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -1); deck.addCard('+2', 'None', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 1); deck.addCard('+2', 'None', -1); }
    },
    'Replace one (+0) card with one (+2) WOUND card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -1); deck.addCard('+2', 'Wound', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 1); deck.addCard('+2', 'Wound', -1); }
    },
    'Replace one (+0) card with one (+2) POISON card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -1); deck.addCard('+2', 'Poison', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 1); deck.addCard('+2', 'Poison', -1); }
    },
    'Replace one (+0) card with one (+2) CURSE card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -1); deck.addCard('+2', 'Curse', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 1); deck.addCard('+2', 'Curse', -1); }
    },
    'Replace one (+0) card with one (+3) MUDDLE card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -1); deck.addCard('+3', 'Muddle', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 1); deck.addCard('+3', 'Muddle', -1); }
    },
    'Replace one (+0) card with one (+1) IMMOBILIZE card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -1); deck.addCard('+1', 'Immobilize', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 1); deck.addCard('+1', 'Immobilize', -1); }
    },
    'Replace one (+0) card with one (+1) DISARM card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -1); deck.addCard('+1', 'Disarm', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 1); deck.addCard('+1', 'Disarm', -1); }
    },
    'Replace one (+0) card with one rolling (+2) card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -1); deck.cards['r+2'] += 1; },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 1); deck.cards['r+2'] -= 1; }
    },
    'Replace one (-1) card with one (+1) card': {
        set: (deck: Deck) => { deck.addCard('-1', 'None', -1); deck.addCard('+1', 'None', 1); },
        unset: (deck: Deck) => { deck.addCard('-1', 'None', 1); deck.addCard('+1', 'None', -1); }
    },
    'Replace one (-2) card with one (+0) card': {
        set: (deck: Deck) => { deck.addCard('-2', 'None', -1); deck.addCard('+0', 'None', 1); },
        unset: (deck: Deck) => { deck.addCard('-2', 'None', 1); deck.addCard('+0', 'None', -1); }
    },
    'Replace two (+1) cards with two (+2) cards': {
        set: (deck: Deck) => { deck.addCard('+1', 'None', -2); deck.addCard('+2', 'None', 2); },
        unset: (deck: Deck) => { deck.addCard('+1', 'None', 2); deck.addCard('+2', 'None', -2); }
    },
    'Replace two (+0) cards with two (+1) cards': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -2); deck.addCard('+1', 'None', 2); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 2); deck.addCard('+1', 'None', -2); }
    },
    'Replace two (+1) cards with one (+4) card': {
        set: (deck: Deck) => { deck.addCard('+1', 'None', -2); deck.addCard('+4', 'None', 1); },
        unset: (deck: Deck) => { deck.addCard('+1', 'None', 2); deck.addCard('+4', 'None', -1); }
    },
    'Replace two (+0) cards with one (+0) FIRE and one (+0) EARTH card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -2); deck.addCard('+0', 'Fire', 1); deck.addCard('+0', 'Earth', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 2); deck.addCard('+0', 'Fire', -1); deck.addCard('+0', 'Earth', -1); }
    },
    'Replace two (+0) cards with one (+0) FROST and one (+0) WIND card': {
        set: (deck: Deck) => { deck.addCard('+0', 'None', -2); deck.addCard('+0', 'Frost', 1); deck.addCard('+0', 'Wind', 1); },
        unset: (deck: Deck) => { deck.addCard('+0', 'None', 2); deck.addCard('+0', 'Frost', -1); deck.addCard('+0', 'Wind', -1); }
    },
    // Effect only perks
    'Add two rolling PUSH 2 cards': {
        set: (deck: Deck) => { deck.effects['Rolling Push 2'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Push 2'] -= 2; }
    },
    'Add two rolling EARTH cards': {
        set: (deck: Deck) => { deck.effects['Rolling Earth'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Earth'] -= 2; }
    },
    'Add two rolling WIND cards': {
        set: (deck: Deck) => { deck.effects['Rolling Wind'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Wind'] -= 2; }
    },
    'Add two rolling FIRE cards': {
        set: (deck: Deck) => { deck.effects['Rolling Fire'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Fire'] -= 2; }
    },
    'Add two rolling PIERCE 3 cards': {
        set: (deck: Deck) => { deck.effects['Rolling Pierce 3'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Pierce 3'] -= 2; }
    },
    'Add two rolling POISON cards': {
        set: (deck: Deck) => { deck.effects['Rolling Poison'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Poison'] -= 2; }
    },
    'Add two rolling MUDDLE cards': {
        set: (deck: Deck) => { deck.effects['Rolling Muddle'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Muddle'] -= 2; }
    },
    'Add two rolling IMMOBILIZE cards': {
        set: (deck: Deck) => { deck.effects['Rolling Immobilize'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Immobilize'] -= 2; }
    },
    'Add two rolling HEAL 1 cards': {
        set: (deck: Deck) => { deck.effects['Rolling Heal 1'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Heal 1'] -= 2; }
    },
    'Add one rolling HEAL 3 card': {
        set: (deck: Deck) => { deck.effects['Rolling Heal 3'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Heal 3'] -= 1; }
    },
    'Add two rolling STUN cards': {
        set: (deck: Deck) => { deck.effects['Rolling Stun'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Stun'] -= 2; }
    },
    'Add two rolling WOUND cards': {
        set: (deck: Deck) => { deck.effects['Rolling Wound'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Wound'] -= 2; }
    },
    'Add two rolling SUN cards': {
        set: (deck: Deck) => { deck.effects['Rolling Sun'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Sun'] -= 2; }
    },
    'Add two rolling CURSE cards': {
        set: (deck: Deck) => { deck.effects['Rolling Curse'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Curse'] -= 2; }
    },
    'Add two rolling SHIELD 1, Self cards': {
        set: (deck: Deck) => { deck.effects['Rolling Shield 1, Self'] += 2; },
        unset: (deck: Deck) => { deck.effects['Rolling Shield 1, Self'] -= 2; }
    },
    'Add one rolling INVISIBLE card': {
        set: (deck: Deck) => { deck.effects['Rolling Invisible'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Invisible'] -= 1; }
    },
    'Add one rolling STUN card': {
        set: (deck: Deck) => { deck.effects['Rolling Stun'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Stun'] -= 1; }
    },
    'Add one rolling DISARM and one rolling MUDDLE card': {
        set: (deck: Deck) => { deck.effects['Rolling Disarm'] += 1; deck.effects['Rolling Muddle'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Disarm'] -= 1; deck.effects['Rolling Muddle'] -= 1; }
    },
    'Add one rolling EARTH and one rolling WIND card': {
        set: (deck: Deck) => { deck.effects['Rolling Earth'] += 1; deck.effects['Rolling Wind'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Earth'] -= 1; deck.effects['Rolling Wind'] -= 1; }
    },
    'Add one rolling SUN and one rolling DARK card': {
        set: (deck: Deck) => { deck.effects['Rolling Sun'] += 1; deck.effects['Rolling Dark'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Sun'] -= 1; deck.effects['Rolling Dark'] -= 1; }
    },
    'Add one rolling FIRE and one rolling WIND card': {
        set: (deck: Deck) => { deck.effects['Rolling Fire'] += 1; deck.effects['Rolling Wind'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Fire'] -= 1; deck.effects['Rolling Wind'] -= 1; }
    },
    'Add one rolling DARK and one rolling EARTH card': {
        set: (deck: Deck) => { deck.effects['Rolling Dark'] += 1; deck.effects['Rolling Earth'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Dark'] -= 1; deck.effects['Rolling Earth'] -= 1; }
    },
    'Add one rolling ADD TARGET card': {
        set: (deck: Deck) => { deck.effects['Rolling Add Target'] += 1; },
        unset: (deck: Deck) => { deck.effects['Rolling Add Target'] -= 1; }
    },
    'Add three rolling PUSH 1 cards': {
        set: (deck: Deck) => { deck.effects['Rolling Push 1'] += 3; },
        unset: (deck: Deck) => { deck.effects['Rolling Push 1'] -= 3; }
    },
    'Add three rolling PULL 1 cards': {
        set: (deck: Deck) => { deck.effects['Rolling Pull 1'] += 3; },
        unset: (deck: Deck) => { deck.effects['Rolling Pull 1'] -= 3; }
    },
    'Add three rolling MUDDLE cards': {
        set: (deck: Deck) => { deck.effects['Rolling Muddle'] += 3; },
        unset: (deck: Deck) => { deck.effects['Rolling Muddle'] -= 3; }
    },
    'Add three rolling POISON cards': {
        set: (deck: Deck) => { deck.effects['Rolling Poison'] += 3; },
        unset: (deck: Deck) => { deck.effects['Rolling Poison'] -= 3; }
    }
};
