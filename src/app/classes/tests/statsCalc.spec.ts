import { DefaultCards, DefaultEffects } from '../deck';
import * as Utils from '../utils';
import * as statsCalc from '../statsCalc';

describe('statsCalc', () => {

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
      input: { None: 1, 'Rolling Fire': 1, Frost: 1 },
      output: {
        None: 1 / 3,
        Fire: (1 / 3) * (1 / 2) // Rolling Fire then nothing
          + (1 / 3) * (1 / 2), // Rolling Fire then Frost
        Frost: (1 / 3) // Frost
          + (1 / 3) * (1 / 2) // Rolling Fire then Frost
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
          + (1 / 5) * (1 / 4) // Rolling Fire followed by Frost
      }
    },
    {
      input: { None: 2, 'Rolling Fire': 1, Fire: 2, Frost: 1 },
      output: {
        None: (2 / 6),
        Fire: (2 / 6) // Fire
          + (1 / 6), // Rolling fire followed by Anything
        Frost: (1 / 6) // Frost
          + (1 / 6) * (1 / 5) // Rolling fire followed by Frost
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
      input: { None: 0, 'Rolling Fire': 2, 'Rolling Frost': 1 },
      output: {
        Fire: 1,
        Frost: 1
      }
    },
    {
      input: { None: 0, 'Rolling Fire': 1, Fire: 1, 'Rolling Frost': 1 },
      output: {
        Fire: (1 / 3) // Fire
          + (1 / 3) * (1 / 2) // Rolling fire, Fire
          + (1 / 3) * (1 / 2) * (1) // Rolling fire, rolling frost, fire
          + (1 / 3) * (1 / 2) // Rolling frost, fire
          + (1 / 3) * (1 / 2) * (1), // Rolling frost, rolling fire, fire
        Frost: (1 / 3) * (1 / 2) // Rolling frost, fire
          + (1 / 3) * (1 / 2) * 1 // Rolling frost, rolling fire, fire
          + (1 / 3) * (1 / 2) * 1// Rolling fire, rolling frost, fire
      }
    },
    {
      input: { None: 1, 'Rolling Fire': 1, 'Rolling Frost': 1, Fire: 1, Frost: 1 },
      output: {
        None: (1 / 5),
        Fire: (1 / 5) // Rolling fire followed by Anything
          + (1 / 5) // Fire
          + (1 / 5) * (1 / 4) // Rolling frost followed by Rolling Fire followed by Anything
          + (1 / 5) * (1 / 4), // Rolling frost followed by Fire
        Frost: (1 / 5) // Frost
          + (1 / 5) // Rolling Frost followed by anything
          + (1 / 5) * (1 / 4) // Rolling Fire followed by Rolling Frost followed by Anything
          + (1 / 5) * (1 / 4) // Rolling Fire followed by Frost
      }
    },
    {
      input: { None: 20, Immobilize: 2, Muddle: 2 },
      output: {
        None: 20 / 24,
        Immobilize: 2 / 24,
        Muddle: 2 / 24
      }
    },
    {
      input: { None: 1, Light: 1 },
      output: {
        None: (1 / 2),
        Light: (1 / 2)
      }
    },
    {
      input: { None: 1, 'Rolling Fire': 2, Frost: 1 },
      output: {
        None: (1 / 4),
        Fire: (2 / 4) * (1 / 3) // Rolling Fire followed by None
          + (2 / 4) * (1 / 3) // Rolling Fire followed by Frost
          + (2 / 4) * (1 / 3) * (1 / 2) // Two rolling fires, None
          + (2 / 4) * (1 / 3) * (1 / 2), // Two rolling fires, Frost
        Frost: (1 / 4) // Frost
          + (2 / 4) * (1 / 3) // Rolling Fire followed by Frost
          + (2 / 4) * (1 / 3) * (1 / 2)
      }
    },
    {
      input: { None: 2, 'Rolling Fire': 2, Fire: 1, Frost: 1 },
      output: {
        None: (2 / 6),
        Fire: (2 / 6) // Rolling Fire followed by Anything
          + (1 / 6), // Fire
        Frost: (1 / 6) // Frost
          + (2 / 6) * (1 / 5) // Rolling Fire followed by Frost
          + (2 / 6) * (1 / 5) * (1 / 4)
      }
    },
    {
      input: { None: 20, Immobilize: 2, Muddle: 2, 'Rolling Earth': 2 },
      output: {
        None: 20 / 26,
        Immobilize: (2 / 26) // Immobilize
          + (2 / 26) * (2 / 25) // Rolling Earth then Immobilize
          + (2 / 26) * (1 / 25) * (2 / 24), // Both Rolling Earths, then Immobilize
        Muddle: (2 / 26) // Muddle
          + (2 / 26) * (2 / 25) // Rolling Earth then Muddle
          + (2 / 26) * (1 / 25) * (2 / 24), // Both Rolling Earths, then Muddle
        Earth: (2 / 26)
      }
    },
    {
      // This test runs slowly
      input: {
        None: 20,
        'Rolling Pull 1': 3,
        'Rolling Muddle': 4,
        'Rolling Immobilize': 2,
        'Rolling Stun': 1,
        'Rolling Disarm': 1
      },
      output: {
        None: 0.6451612903225806,
        'Pull 1': 0.13043478260869565,
        Muddle: 0.16666666666666663,
        Immobilize: 0.09090909090909091,
        Stun: 0.04761904761904762,
        Disarm: 0.047619047619047616
      }
    }
  ];

  // Test that we can properly calculate effect probability
  Object.values(effectsProbabilityTests).forEach(test => {
    const testName = `should properly calculate EFFECT probability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.output)}`;
    it(testName, () => {
      const probability = statsCalc.getEffectsProbability(test.input);

      for (const key of Object.keys(probability)) {
        expect(probability[key]).toBeCloseTo(test.output[key], 10, key);
      }

    });
  });

  it('shouldn\'t change effects when calculating card probabilities', () => {
    const effects = Utils.clone(DefaultEffects);
    const originalEffects = Utils.clone(effects);
    statsCalc.getEffectsProbability(effects);

    expect(effects).toEqual(originalEffects);
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
    let cards = Utils.clone(DefaultCards);
    Object.keys(cards).forEach(key => cards[key] = 0); // Set all cards to 0;
    cards = Object.assign({}, cards, test.input);

    it(`should properly calculate CARD probability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.probability)}`, () => {
      expect(statsCalc.getCardsProbability(cards)).toEqual(Object.assign({}, cards, test.probability));
    });

    // tslint:disable-next-line:max-line-length
    it(`should properly calculate POSITIVE reliability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.reliability.positive)}`, () => {
      expect(statsCalc.reliabilityPositive(cards)).toBeCloseTo(test.reliability.positive);
    });

    // tslint:disable-next-line:max-line-length
    it(`should properly calculate NEGATIVE reliability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.reliability.negative)}`, () => {
      expect(statsCalc.reliabilityNegative(cards)).toBeCloseTo(test.reliability.negative);
    });

    // tslint:disable-next-line:max-line-length
    it(`should properly calculate NEUTRAL reliability for ${JSON.stringify(test.input)} as ${JSON.stringify(test.reliability.neutral)}`, () => {
      expect(statsCalc.reliabilityZero(cards)).toBeCloseTo(test.reliability.neutral);
    });
  });

  const deckShuffleTests = [
    {
      input: { x0: 1, x2: 1 },
      action: 1,
      probability: 2 / 2,
    },
    {
      input: { x0: 1, x2: 1, '+1': 1 },
      action: 1,
      probability: 2 / 3,
    },
    {
      input: { x0: 1, x2: 1, '+1': 1 },
      action: 2,
      probability: 2 / 2,
    },
    {
      input: { x0: 1, x2: 1, '+1': 1, 'r+1': 5 },
      action: 1,
      probability: 2 / 3,
    },
  ];

  Object.values(deckShuffleTests).forEach(test => {
    let cards = Utils.clone(DefaultCards);
    Object.keys(cards).forEach(key => cards[key] = 0); // Set all cards to 0;
    cards = Object.assign({}, cards, test.input);

    // tslint:disable-next-line:max-line-length
    it(`should properly calculate SHUFFLE probability for ${JSON.stringify(test.input)} on action ${test.action} as ${test.probability}`, () => {
      expect(statsCalc.getShuffleChance(cards, test.action)).toEqual(test.probability);
    });
  });

});
