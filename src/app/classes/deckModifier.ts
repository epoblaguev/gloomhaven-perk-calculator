import { Character } from './character';

export class DeckModifier {
    name: string;
    uses: Array<{ used: boolean }>;
    set: (char: Character) => void;

    constructor(name: string, uses: number, set: (char: Character) => void, useValue = false) {
        this.name = name;
        this.uses = Array<{ used: boolean }>();

        for (let i = 0; i < uses; i++) {
            this.uses.push({ used: useValue });
        }
        this.set = set;
    }
}

export const NEG_SCENARIO_EFFECTS_LIST = {
    '-1': (char: Character) => char.deck.addCard('-1', 'None', 1),
    Curse: (char: Character) => char.deck.addCard('Curse', 'None', 1)
};

export const NEG_ITEM_EFFECTS_LIST = {
    '-1': (char: Character) => char.deck.addCard('-1', 'None', 1)
};

export const MISC_MODIFIERS_LIST = {
    '+1': (char: Character) => char.deck.addCard('+1', 'None', 1),
    Bless: (char: Character) => char.deck.addCard('Bless', 'None', 1)
};

export const PERK_LIST = {
    'Add one (-1) DARK card': (char: Character) => { char.deck.addCard('-1', 'Dark', 1); },
    'Add one (+0) ADD TARGET card': (char: Character) => { char.deck.addCard('+0', 'Add Target', 1); },
    'Add one (+0) STUN card': (char: Character) => { char.deck.addCard('+0', 'Stun', 1); },
    'Add one (+0) Refresh and item card': (char: Character) => { char.deck.addCard('+0', 'Refresh an item', 1); },
    'Add one (+1) CURSE card': (char: Character) => { char.deck.addCard('+1', 'Curse', 1); },
    'Add one (+1) HEAL 2 card': (char: Character) => { char.deck.addCard('+1', 'Heal 2', 1); },
    'Add one (+1) IMMOBILIZE card': (char: Character) => { char.deck.addCard('+1', 'Immobilize', 1); },
    'Add one (+1) INVISIBLE card': (char: Character) => { char.deck.addCard('+1', 'Invisible', 1); },
    'Add one (+1) WOUND card': (char: Character) => { char.deck.addCard('+1', 'Wound', 1); },
    'Add one (+1) WIND card': (char: Character) => { char.deck.addCard('+1', 'Wind', 1); },
    'Add one (+1) POISON card': (char: Character) => { char.deck.addCard('+1', 'Poison', 1); },
    'Add one (+2) FIRE card': (char: Character) => { char.deck.addCard('+2', 'Fire', 1); },
    'Add one (+2) FROST card': (char: Character) => { char.deck.addCard('+2', 'Frost', 1); },
    'Add one (+2) MUDDLE card': (char: Character) => { char.deck.addCard('+2', 'Muddle', 1); },
    'Add one (+2) card': (char: Character) => { char.deck.addCard('+2', 'None', 1); },
    'Add one (+1) Shield 1, Self card': (char: Character) => { char.deck.addCard('+1', 'Shield 1, Self', 1); },
    'Add one (+3) card': (char: Character) => { char.deck.addCard('+3', 'None', 1); },
    'Add one (-2) card and two (+2) cards': (char: Character) => {
        char.deck.addCard('-2', 'None', 1);
        char.deck.addCard('+2', 'None', 2);
    },
    'Add one rolling (+1) DISARM card': (char: Character) => { char.deck.addCard('r+1', 'Rolling Disarm', 1); },
    'Add one rolling (+2) card': (char: Character) => { char.deck.cards['r+2'] += 1; },
    'Add two (+1) cards': (char: Character) => { char.deck.addCard('+1', 'None', 2); },
    'Add two (+1) PUSH 1 cards': (char: Character) => { char.deck.addCard('+1', 'Push 1', 2); },
    'Add two rolling (+1) cards': (char: Character) => { char.deck.cards['r+1'] += 2; },
    'Add three rolling (+1) cards': (char: Character) => { char.deck.cards['r+1'] += 3; },
    'Add three (+0) FIRE cards': (char: Character) => { char.deck.addCard('+0', 'Fire', 3); },
    'Add three (+0) FROST cards': (char: Character) => { char.deck.addCard('+0', 'Frost', 3); },
    'Add three (+0) WIND cards': (char: Character) => { char.deck.addCard('+0', 'Wind', 3); },
    'Add three (+0) EARTH cards': (char: Character) => { char.deck.addCard('+0', 'Earth', 3); },
    'Ignore negative scenario effects': (char: Character) => { char.ignoreNegScenarioEffects = true; },
    'Ignore negative scenario effects and add one (+1) card': (char: Character) => {
        char.ignoreNegScenarioEffects = true;
        char.deck.addCard('+1', 'None', 2);
    },
    'Ignore negative item effects': (char: Character) => { char.ignoreNegItemEffects = true; },
    'Ignore negative item effects and add one (+1) card': (char: Character) => {
        char.ignoreNegItemEffects = true;
        char.deck.addCard('+1', 'None', 1);
    },
    'Ignore negative item effects and add two (+1) cards': (char: Character) => {
        char.ignoreNegItemEffects = true;
        char.deck.addCard('+1', 'None', 2);
    },
    'Remove four (+0) cards': (char: Character) => { char.deck.addCard('+0', 'None', -4); },
    'Remove two (-1) cards': (char: Character) => { char.deck.addCard('-1', 'None', -2); },
    'Remove one (-2) card': (char: Character) => { char.deck.addCard('-2', 'None', -1); },
    'Replace one (-1) DARK card with one (+1) DARK card': (char: Character) => {
        char.deck.addCard('-1', 'Dark', -1);
        char.deck.addCard('+1', 'Dark', 1);
    },
    'Replace one (-1) card with one (+0) STUN card': (char: Character) => {
        char.deck.addCard('-1', 'None', -1);
        char.deck.addCard('+0', 'Stun', 1);
    },
    'Replace one (+0) card with one (+2) card': (char: Character) => {
        char.deck.addCard('+0', 'None', -1);
        char.deck.addCard('+2', 'None', 1);
    },
    'Replace one (+0) card with one (+2) WOUND card': (char: Character) => {
        char.deck.addCard('+0', 'None', -1);
        char.deck.addCard('+2', 'Wound', 1);
    },
    'Replace one (+0) card with one (+2) POISON card': (char: Character) => {
        char.deck.addCard('+0', 'None', -1);
        char.deck.addCard('+2', 'Poison', 1);
    },
    'Replace one (+0) card with one (+2) CURSE card': (char: Character) => {
        char.deck.addCard('+0', 'None', -1);
        char.deck.addCard('+2', 'Curse', 1);
    },
    'Replace one (+0) card with one (+3) MUDDLE card': (char: Character) => {
        char.deck.addCard('+0', 'None', -1);
        char.deck.addCard('+3', 'Muddle', 1);
    },
    'Replace one (+0) card with one (+1) IMMOBILIZE card': (char: Character) => {
        char.deck.addCard('+0', 'None', -1);
        char.deck.addCard('+1', 'Immobilize', 1);
    },
    'Replace one (+0) card with one (+1) DISARM card': (char: Character) => {
        char.deck.addCard('+0', 'None', -1);
        char.deck.addCard('+1', 'Disarm', 1);
    },
    'Replace one (+0) card with one rolling (+2) card': (char: Character) => {
        char.deck.addCard('+0', 'None', -1);
        char.deck.cards['r+2'] += 1;
    },
    'Replace one (-1) card with one (+1) card': (char: Character) => {
        char.deck.addCard('-1', 'None', -1);
        char.deck.addCard('+1', 'None', 1);
    },
    'Replace one (-2) card with one (+0) card': (char: Character) => {
        char.deck.addCard('-2', 'None', -1);
        char.deck.addCard('+0', 'None', 1);
    },
    'Replace two (+1) cards with two (+2) cards': (char: Character) => {
        char.deck.addCard('+1', 'None', -2);
        char.deck.addCard('+2', 'None', 2);
    },
    'Replace two (+0) cards with two (+1) cards': (char: Character) => {
        char.deck.addCard('+0', 'None', -2);
        char.deck.addCard('+1', 'None', 2);
    },
    'Replace two (+1) cards with one (+4) card': (char: Character) => {
        char.deck.addCard('+1', 'None', -2);
        char.deck.addCard('+4', 'None', 1);
    },
    'Replace two (+0) cards with one (+0) FIRE and one (+0) EARTH card': (char: Character) => {
        char.deck.addCard('+0', 'None', -2);
        char.deck.addCard('+0', 'Fire', 1);
        char.deck.addCard('+0', 'Earth', 1);
    },
    'Replace two (+0) cards with one (+0) FROST and one (+0) WIND card': (char: Character) => {
        char.deck.addCard('+0', 'None', -2);
        char.deck.addCard('+0', 'Frost', 1);
        char.deck.addCard('+0', 'Wind', 1);
    },
    // Effect only perks
    'Add two rolling PUSH 2 cards': (char: Character) => { char.deck.effects['Rolling Push 2'] += 2; },
    'Add two rolling EARTH cards': (char: Character) => { char.deck.effects['Rolling Earth'] += 2; },
    'Add two rolling WIND cards': (char: Character) => { char.deck.effects['Rolling Wind'] += 2; },
    'Add two rolling FIRE cards': (char: Character) => { char.deck.effects['Rolling Fire'] += 2; },
    'Add two rolling PIERCE 3 cards': (char: Character) => { char.deck.effects['Rolling Pierce 3'] += 2; },
    'Add two rolling POISON cards': (char: Character) => { char.deck.effects['Rolling Poison'] += 2; },
    'Add two rolling MUDDLE cards': (char: Character) => { char.deck.effects['Rolling Muddle'] += 2; },
    'Add two rolling IMMOBILIZE cards': (char: Character) => { char.deck.effects['Rolling Immobilize'] += 2; },
    'Add two rolling HEAL 1 cards': (char: Character) => { char.deck.effects['Rolling Heal 1'] += 2; },
    'Add one rolling HEAL 3 card': (char: Character) => { char.deck.effects['Rolling Heal 3'] += 1; },
    'Add two rolling STUN cards': (char: Character) => { char.deck.effects['Rolling Stun'] += 2; },
    'Add two rolling WOUND cards': (char: Character) => { char.deck.effects['Rolling Wound'] += 2; },
    'Add two rolling SUN cards': (char: Character) => { char.deck.effects['Rolling Sun'] += 2; },
    'Add two rolling CURSE cards': (char: Character) => { char.deck.effects['Rolling Curse'] += 2; },
    'Add two rolling SHIELD 1, Self cards': (char: Character) => { char.deck.effects['Rolling Shield 1, Self'] += 2; },
    'Add one rolling INVISIBLE card': (char: Character) => { char.deck.effects['Rolling Invisible'] += 1; },
    'Add one rolling STUN card': (char: Character) => { char.deck.effects['Rolling Stun'] += 1; },
    'Add one rolling DISARM and one rolling MUDDLE card': (char: Character) => {
        char.deck.effects['Rolling Disarm'] += 1;
        char.deck.effects['Rolling Muddle'] += 1;
    },
    'Add one rolling EARTH and one rolling WIND card': (char: Character) => {
        char.deck.effects['Rolling Earth'] += 1;
        char.deck.effects['Rolling Wind'] += 1;
    },
    'Add one rolling SUN and one rolling DARK card': (char: Character) => {
        char.deck.effects['Rolling Sun'] += 1;
        char.deck.effects['Rolling Dark'] += 1;
    },
    'Add one rolling FIRE and one rolling WIND card': (char: Character) => {
        char.deck.effects['Rolling Fire'] += 1;
        char.deck.effects['Rolling Wind'] += 1;
    },
    'Add one rolling DARK and one rolling EARTH card': (char: Character) => {
        char.deck.effects['Rolling Dark'] += 1;
        char.deck.effects['Rolling Earth'] += 1;
    },
    'Add one rolling ADD TARGET card': (char: Character) => { char.deck.effects['Rolling Add Target'] += 1; },
    'Add three rolling PUSH 1 cards': (char: Character) => { char.deck.effects['Rolling Push 1'] += 3; },
    'Add three rolling PULL 1 cards': (char: Character) => { char.deck.effects['Rolling Pull 1'] += 3; },
    'Add three rolling MUDDLE cards': (char: Character) => { char.deck.effects['Rolling Muddle'] += 3; },
    'Add three rolling POISON cards': (char: Character) => { char.deck.effects['Rolling Poison'] += 3; }
};
