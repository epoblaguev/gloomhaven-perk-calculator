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

    it('should have undefined comparison by default', () => {
        const deck = new Deck();
        expect(deck.comparison).toBeUndefined('Comparison doesn\'t start as null');
    });

    it('comparison should create clone of cards and effects', () => {
        const deck = new Deck();

        deck.saveComparison();
        expect(deck.comparison.cards).toEqual(deck.cards, 'Comparison isn\'t exact copy of cards');
        expect(deck.comparison.effects).toEqual(deck.effects, 'Comparison isn\'t exact copy of effects');

        deck.cards['+0'] += 1;
        deck.effects['None'] += 1;

        expect(deck.comparison.cards).not.toEqual(deck.cards, 'Comparison changes along with cards');
        expect(deck.comparison.effects).not.toEqual(deck.effects, 'Comparison changes along with effects');

        deck.clearComparisons();
        expect(deck.comparison).toBeUndefined('Clearing comparisons doesn\'t make them undefined');
    });


    const effectsProbabilityTests = [
        {
            input: { None: 20, Fire: 1 },
            output: {
                None: 20 / 21,
                Fire: 1 / 21,
            }
        },
        {
            input: { None: 20, Fire: 1, Frost: 1 },
            output: {
                None: 20 / 22,
                Fire: 1 / 22,
                Frost: 1 / 22
            }
        },
        {
            input: { None: 1, Fire: 1 },
            output: {
                None: 1 / 2,
                Fire: 1 / 2
            }
        },
        {
            input: { None: 1, 'Rolling Fire': 1 },
            output: {
                None: 1 / 2,
                Fire: 1 / 2
            }
        },
        {
            input: { None: 1, 'Rolling Fire': 1, Fire: 1 },
            output: {
                None: 1 / 3,
                Fire: (1 / 3) + (1 / 3) * 1
            }
        },
        {
            input: { None: 2, 'Rolling Fire': 1, Fire: 1 },
            output: {
                None: (2 / 4),
                Fire: (1 / 4) + (1 / 4) * 1
            }
        },
        {
            input: { None: 2, 'Rolling Fire': 1, Fire: 1, Frost: 1 },
            output: {
                None: (2 / 5),
                Fire: (1 / 5) // Rolling Fire followed by Anything
                    + (1 / 5), // Fire
                Frost: (1 / 5) // Frost
                    + (1 / 5) * (1 / 2) // Rolling Fire followed by Frost
            }
        },
        {
            input: { None: 2, 'Rolling Fire': 1, Fire: 2, Frost: 1 },
            output: {
                None: (2 / 6),
                Fire: (2 / 6) // Fire
                    + (1 / 6), // Rolling fire followed by Anything
                Frost: (1 / 6) // Frost
                    + (1 / 6) * (1 / 3) // Rolling fire followed by Frost
            }
        },
        {
            input: { None: 0, 'Rolling Fire': 1, Fire: 1, 'Rolling Frost': 1 },
            output: {
                Fire: (1 / 3) // Fire
                    + (1 / 3) // Rolling fire followed by Anything
                    + (1 / 3), // Rolling frost followed by Anything
                Frost: (1 / 3) // Rolling frost followed by Anything
                    + (1 / 3) * (1 / 2) // Rolling fire followed by rolling frost
            }
        },
        {
            input: { None: 1, 'Rolling Fire': 1, 'Rolling Frost': 1, Fire: 1, Frost: 1 },
            output: {
                None: (1 / 5),
                Fire: (1 / 5) // Rolling fire followed by Anything
                    + (1 / 5) // Fire
                    + (1 / 5) * (1 / 3) // Rolling frost followed by Rolling Fire followed by Anything
                    + (1 / 5) * (1 / 3), // Rolling frost followed by Fire
                Frost: (1 / 5) // Frost
                    + (1 / 5) // Rolling Frost followed by anything
                    + (1 / 5) * (1 / 3) // Rolling Fire followed by Rolling Frost followed by Anything
                    + (1 / 5) * (1 / 3) // Rolling Fire followed by Frost
            }
        }
    ];

    // Test that we can properly calculate effect probability
    Object.values(effectsProbabilityTests).forEach(test => {
        const testName = `should properly calculate probability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.output)}`;
        it(testName, () => {
            const deck = new Deck();
            deck.effects = Object.assign({}, deck.effects, test.input);
            const effects2 = {};
            Object.keys(deck.effects).filter(key => deck.effects[key] !== 0).forEach(key => {
                effects2[key] = deck.effects[key];
            });
            effects2['None'] = deck.effects['None'];
            const probability = deck.getEffectsProbability(effects2);
            expect(probability).toEqual(test.output, `Expected: ${JSON.stringify(test.output)}`);
        });
    });

});
