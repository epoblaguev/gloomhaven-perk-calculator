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


    const nonRollingTests = [
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
                Fire: (1 / 5) + (1 / 5) * (1 / 2),
                Frost: (1 / 5) + (1 / 5) * (1 / 2)
            }
        },
        {
            input: { None: 2, 'Rolling Fire': 1, Fire: 2, Frost: 1 },
            output: {
                None: (2 / 6),
                Fire: (2 / 6) + (1 / 6) * (2 / 3),
                Frost: (1 / 6) + (1 / 6) * (1 / 3)
            }
        },
        {
            input: { None: 0, 'Rolling Fire': 1, Fire: 1, 'Rolling Frost': 1 },
            output: {
                Fire: (1 / 3) + (1 / 3) * 1 + (1 / 3) * ((1 / 2) + (1 / 2) * 1),
                Frost: (1 / 3) + (1 / 3) * (1 / 2)
            }
        },
        {
            input: { None: 1, 'Rolling Fire': 1, 'Rolling Frost': 1, Fire: 1, Frost: 1 },
            output: {
                None: (1 / 5),
                Fire: (1 / 5) + (1 / 5) * 1 + (1 / 5) * ((1 / 4) + (1 / 4)),
                Frost: (1 / 5) + (1 / 5) * 1 + (1 / 5) * ((1 / 4) + (1 / 4))
            }
        }
    ];

    Object.values(nonRollingTests).forEach(test => {
        const testName = `should properly calculate probability for ${JSON.stringify(test.input)}`;
        console.log(`RUNNING - ${testName}`);
        it(testName, () => {
            const deck = new Deck();
            deck.effects = Object.assign({}, deck.effects, test.input);
            const probability = deck.getEffectsProbability();
            expect(probability).toEqual(test.output, `Expected: ${JSON.stringify(test.output)}`);
        });
    });

    /*
    it('effect probability should be calculated correctly (rolling)', () => {
        const deck = new Deck();
        let probability = {};

        // None = 1, Rolling Fire = 1
        deck.effects['None'] = 1;
        deck.effects['Rolling Fire'] = 1;
        probability = deck.getEffectsProbability();
        expect(probability).toEqual({ None: 1 / 2, Fire: 1 / 2 });

        // None = 1, Rolling Fire = 1, Fire = 1
        deck.effects['Fire'] = 1;
        probability = deck.getEffectsProbability();
        expect(probability).toEqual({
            None: 1 / 3,
            Fire: (1 / 3) + (1 / 3) * 1
        }, 'FAILED 2');

        // None = 2, Rolling Fire = 1, Fire = 1
        deck.effects['None'] = 2;
        probability = deck.getEffectsProbability();
        expect(probability).toEqual({
            None: (2 / 4),
            Fire: (1 / 4) + (1 / 4) * 1
        });

        // None = 2, Rolling Fire = 1, Fire = 1, Frost = 1
        deck.effects['Frost'] += 1;
        probability = deck.getEffectsProbability();
        expect(probability).toEqual({
            None: (2 / 5),
            Fire: (1 / 5) + (1 / 5) * (1 / 2),
            Frost: (1 / 5) + (1 / 5) * (1 / 2)
        });

        // None = 2, Rolling Fire = 1, Fire = 2, Frost = 1
        probability = deck.getEffectsProbability();
        expect(probability).toEqual({
            None: (2 / 6),
            Fire: (2 / 6) + (1 / 5) * (2 / 3),
            Frost: (1 / 6) + (1 / 5) * (1 / 3)
        });

    });
    */
});
