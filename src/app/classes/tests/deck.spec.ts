import { PERK_LIST, Perk } from '../perk';
import { Deck } from '../deck';
import Utils from '../utils';

describe('Deck', () => {
    it('should create an instance', () => {
        expect(new Deck()).toBeTruthy();
    });

    it('should start with 20 cards', () => {
        const deck = new Deck();
        const cardCount = Object.values(deck.cards).reduce((a, b) => a + b);
        const effectCount = Object.values(deck.effects).reduce((a, b) => a + b);
        expect(cardCount === 20).toBeTruthy(`Deck starts with ${cardCount} cards instead of 20`);
        expect(effectCount === 20).toBeTruthy(`Deck starts with ${cardCount} effects instead of 20`);
    });

    it('comparison should create clone of cards and effects', () => {
        const deck = new Deck();
        expect(deck.comparison == null).toBeTruthy('Comparison doesn\'t start as null');

        deck.saveComparison();
        expect(Utils.equals(deck.comparison.cards, deck.cards)).toBeTruthy('Comparison isn\'t exact copy of cards');
        expect(Utils.equals(deck.comparison.effects, deck.effects)).toBeTruthy('Comparison isn\'t exact copy of effects');

        deck.cards['+0'] += 1;
        // tslint:disable-next-line:no-string-literal
        deck.effects['None'] += 1;

        expect(!Utils.equals(deck.comparison.cards, deck.cards)).toBeTruthy('Comparison changes along with cards');
        expect(!Utils.equals(deck.comparison.effects, deck.effects)).toBeTruthy('Comparison changes along with effects');
    });
});
