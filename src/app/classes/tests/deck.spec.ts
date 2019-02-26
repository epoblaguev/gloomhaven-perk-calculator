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
            input: { None: 0, 'Rolling Fire': 1, 'Rolling Frost': 1 },
            output: {
                Fire: (1 / 2) // Rolling fire followed by Anything
                    + (1 / 2), // Rolling frost followed by rolling fire
                Frost: (1 / 2) // Rolling frost followed by Anything
                    + (1 / 2)  // Rolling fire followed by rolling frost
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
        const testName = `should properly calculate EFFECT probability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.output)}`;
        it(testName, () => {
            const deck = new Deck();
            deck.effects = Object.assign({}, deck.effects, test.input);

            const probability = deck.getEffectsProbability(deck.effects);
            // expect(probability).toEqual(test.output, `Expected: ${JSON.stringify(test.output)}`);
            for (const key of Object.keys(probability)) {
                expect(probability[key]).toBeCloseTo(test.output[key]);
            }
        });
    });

    const cardsProbabilityTests = [
        {
            input: { '+0': 1 },
            probability: { '+0': 1 / 1 },
            reliability: { positive: 0, negative: 0, neutral: 1 }
        },
        {
            input: { '-1': 1, '+0': 5, '+1': 1 },
            probability: { '-1': 1 / 7, '+0': 5 / 7, '+1': 1 / 7 },
            reliability: { negative: 1 / 7, neutral: 5 / 7, positive: 1 / 7 }
        },
        {
            input: { '-2': 1, '-1': 1, '+0': 5, '+1': 1 },
            probability: { '-2': 1 / 8, '-1': 1 / 8, '+0': 5 / 8, '+1': 1 / 8 },
            reliability: { negative: 2 / 8, neutral: 5 / 8, positive: 1 / 8 }
        },
        {
            input: { '-1': 1, '+0': 5, '+1': 1, 'r+1': 1 },
            probability: { '-1': 1 / 7, '+0': 5 / 7, '+1': 1 / 7, 'r+1': 1 / 8 },
            reliability: {
                negative: (1 / 8),
                neutral: (5 / 8) + (1 / 8) * (1 / 7),
                positive: (1 / 8) + (1 / 8) * (6 / 7)
            }
        },
        {
            input: { '-1': 1, '+0': 5, '+1': 1, 'r+1': 2 },
            probability: { '-1': 1 / 7, '+0': 5 / 7, '+1': 1 / 7, 'r+1': 2 / 9 },
            reliability: {
                negative: (1 / 9),
                neutral: (5 / 9) + (2 / 9) * (1 / 8),
                positive: (1 / 9) // +1
                    + (2 / 9) * (6 / 8) // r+1 then anything except r+1 or -1
                    + (2 / 9) * (1 / 8) // r+1 then r+1 then anything
            }
        },
        {
            input: { '-1': 1, '+0': 5, '+1': 1, 'r+1': 2, 'r+2': 1 },
            probability: { '-1': 1 / 7, '+0': 5 / 7, '+1': 1 / 7, 'r+1': 2 / 9, 'r+2': 1 / 8 },
            reliability: {
                negative: (1 / 10),
                neutral: (5 / 10) // +0
                    + (2 / 10) * (1 / 8), // r+1 then -1
                positive: (1 / 10) // +1
                    + (2 / 10) * (7 / 9) // r+1 then anything except r+1 or -1
                    + (2 / 10) * (1 / 9) // r+1 then r+1 then anything
                    + (1 / 10) // r+2 then anything
            }
        },
    ];

    Object.values(cardsProbabilityTests).forEach(test => {
        const deck = new Deck();
        Object.keys(deck.cards).forEach(key => deck.cards[key] = 0); // Set all cards to 0;
        deck.cards = Object.assign({}, deck.cards, test.input);

        it(`should properly calculate CARD probability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.probability)}`, () => {
            expect(deck.getCardsProbability()).toEqual(Object.assign({}, deck.cards, test.probability));
        });

        // tslint:disable-next-line:max-line-length
        it(`should properly calculate POSITIVE reliability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.reliability.positive)}`, () => {
            expect(deck.reliabilityPositive()).toBeCloseTo(test.reliability.positive);
        });

        // tslint:disable-next-line:max-line-length
        it(`should properly calculate NEGATIVE reliability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.reliability.negative)}`, () => {
            expect(deck.reliabilityNegative()).toBeCloseTo(test.reliability.negative);
        });

        // tslint:disable-next-line:max-line-length
        it(`should properly calculate NEUTRAL reliability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.reliability.neutral)}`, () => {
            expect(deck.reliabilityZero()).toBeCloseTo(test.reliability.neutral);
        });
    });

});
