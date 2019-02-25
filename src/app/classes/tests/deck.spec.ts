import { Deck } from '../deck';

describe('Deck', () => {
    it('should create an instance', () => {
        expect(new Deck()).toBeTruthy();
    });

    it('should start with 20 cards', () => {
        const deck = new Deck();
        const cardCount = Object.values(deck.cards).reduce((a, b) => a + b);
        const effectCount = Object.values(deck.effects).reduce((a, b) => a + b);
        expect(cardCount).toEqual(20, `Deck starts with ${cardCount} cards instead of 20`);
        expect(effectCount).toEqual(20, `Deck starts with ${cardCount} effects instead of 20`);
    });

    it('comparison should create clone of cards and effects', () => {
        const deck = new Deck();
        expect(deck.comparison).toBeUndefined('Comparison doesn\'t start as null');

        deck.saveComparison();
        expect(deck.comparison.cards).toEqual(deck.cards, 'Comparison isn\'t exact copy of cards');
        expect(deck.comparison.effects).toEqual(deck.effects, 'Comparison isn\'t exact copy of effects');

        deck.cards['+0'] += 1;
        deck.effects['None'] += 1;

        expect(deck.comparison.cards).not.toEqual(deck.cards, 'Comparison changes along with cards');
        expect(deck.comparison.effects).not.toEqual(deck.effects, 'Comparison changes along with effects');

        deck.clearComparisons();
        expect(deck.comparison).toBeUndefined('Comparison doesn\'t start as null');
    });

    it('effect probability should be calculated correctly (non-rolling)', () => {
        const deck = new Deck();

        deck.effects['Fire'] += 1;
        expect(deck.getEffectsProbability()).toEqual({ None: 20 / 21, Fire: 1 / 21 });

        deck.effects['Frost'] += 1;
        expect(deck.getEffectsProbability()).toEqual({ None: 20 / 22, Fire: 1 / 22, Frost: 1 / 22 });
    });

    it('effect probability should be calculated correctly (rolling)', () => {
        const deck = new Deck();

        deck['None'] = 1;
        deck['Rolling Fire'] = 1;
        expect(deck.getEffectsProbability()).toEqual({ None: 1 / 2, Fire: 1 / 2 });
    });
});
