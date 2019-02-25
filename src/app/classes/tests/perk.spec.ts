import { PERK_LIST, Perk } from '../perk';
import { Deck } from '../deck';
import Utils from '../utils';

describe('Perk', () => {
    it('should create an instance', () => {
        Object.keys(PERK_LIST).forEach(key => {
            expect(new Perk(key, 1, PERK_LIST[key].set, PERK_LIST[key].unset)).toBeTruthy(`'[${key}] is not truthy`);
        });
    });

    it('perks should be reversable', () => {
        const deck = new Deck();
        Object.keys(PERK_LIST).forEach(key => {
            const originalDeck: Deck = Utils.clone(deck);

            PERK_LIST[key].set(deck);
            PERK_LIST[key].unset(deck);

            expect(deck.cards).toEqual(originalDeck.cards, `"${key}" cards aren't reversable`);
            expect(deck.effects).toEqual(originalDeck.effects, `"${key}" effects aren't reversable`);
        });
    });
});
