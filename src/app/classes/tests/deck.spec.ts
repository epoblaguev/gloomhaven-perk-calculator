import { Deck } from '../deck';

describe('Deck', () => {
    it('should create an instance', () => {
        expect(new Deck()).toBeTruthy();
    });

    it('should start with 20 cards', () => {
        const deck = new Deck();
        const cardCount = Object.values(deck.cards).reduce((a, b) => a + b);
        expect(cardCount).toEqual(20, `Deck starts with ${cardCount} cards instead of 20`);
    });

    it('should start with 20 effects', () => {
        const deck = new Deck();
        const effectCount = Object.values(deck.effects).reduce((a, b) => a + b);
        expect(effectCount).toEqual(20, `Deck starts with ${effectCount} effects instead of 20`);
    });

    it('should be able to add and remove cards', () => {
        const baseDeck = new Deck();
        const deck = new Deck();
        deck.addCard('+1', 'None', 1);
        deck.addCard('+2', 'None', -1);
        expect(deck.cards['+1']).toEqual(baseDeck.cards['+1'] + 1, 'Adding cards to deck is not working correctly');
        expect(deck.cards['+2']).toEqual(baseDeck.cards['+2'] - 1, 'Removing cards from deck is not working correctly');
    });

    it('should be cloneable and resetable', () => {
        const baseDeck = new Deck();
        const clonedDeck = baseDeck.cloneDeck();

        expect(clonedDeck).toEqual(baseDeck, 'Cloned deck is not equal to base deck.');

        clonedDeck.addCard('+1', 'None', 1);
        expect(clonedDeck).not.toEqual(baseDeck, 'Changes to cloned deck reflect in original deck.');

        clonedDeck.reset();
        expect(clonedDeck).toEqual(baseDeck, 'Issue resetting deck');
    });
});
