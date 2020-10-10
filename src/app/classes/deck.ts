import _ from 'lodash';

const DefaultCards = {
  x0: 1,
  '-2': 1,
  '-1': 5,
  '+0': 6,
  '+1': 5,
  '+2': 1,
  '+3': 0,
  '+4': 0,
  x2: 1,
  'r+1': 0,
  'r+2': 0,
  Bless: 0,
  Curse: 0,
};

const DefaultEffects = {
  None: 20,
};

export class Deck {
  private static readonly cardValue = {
    x0: (x: number) => x * 0,
    '-2': (x: number) => x - 2,
    '-1': (x: number) => x - 1,
    '+0': (x: number) => x + 0,
    '+1': (x: number) => x + 1,
    '+2': (x: number) => x + 2,
    '+3': (x: number) => x + 3,
    '+4': (x: number) => x + 4,
    x2: (x: number) => x * 2,
    'r+1': (x: number) => x + 1,
    'r+2': (x: number) => x + 2,
    Curse: (x: number) => x * 0,
    Bless: (x: number) => x * 2,
  };

  public effects: typeof DefaultEffects;
  public cards: typeof DefaultCards;

  constructor() {
    this.cards = _.cloneDeep(DefaultCards);
    this.effects = _.cloneDeep(DefaultEffects);
  }

  private sum(obj: object): number {
    return Object.values(obj).reduce((p, c) => p + c);
  }

  private nonRollingSum(obj: object): number {
    return Object.keys(obj)
      .map(key => key.startsWith('r+') || key.startsWith('Rolling') ? 0 : this.cards[key])
      .reduce((a, b) => a + b);
  }

  public getCardsProbability(): object {
    const nonRollingSum = this.nonRollingSum(this.cards);
    const probabilities = {};

    for (const key of Object.keys(this.cards)) {
      const val = this.cards[key];
      const sum = key.startsWith('r+') || key.startsWith('Rolling') ? nonRollingSum + val : nonRollingSum;
      probabilities[key] = val / sum;
    }

    return probabilities;
  }

  private getReliability(cards: typeof DefaultCards, rollingValue = 0, compareFunc: (x: number) => boolean) {
    // The base damage from which to start calculating.
    // If ending value is less, reliability is negative, if same, neutral, and if more positive.
    const baseValue = 10;

    let probability = 0;

    for (const cardType in cards) {
      // Ignore cards not in deck
      if (cards[cardType] === 0) {
        continue;
      }

      if (!cardType.startsWith('r') && compareFunc(Deck.cardValue[cardType](baseValue + rollingValue) - baseValue)) {
        probability += cards[cardType] / this.sum(cards);
      } else if (cardType.startsWith('r')) {
        const newCards = _.cloneDeep(cards);
        newCards[cardType] -= 1;

        probability += (cards[cardType] / this.sum(cards))
          * this.getReliability(newCards, Deck.cardValue[cardType](baseValue + rollingValue) - baseValue, compareFunc);
      }
    }

    return probability;
  }

  public reliabilityNegative() {
    const compareFunc = (x: number) => x < 0;
    const probability = this.getReliability(this.cards, 0, compareFunc);
    return probability;
  }

  public reliabilityZero() {
    const compareFunc = (x: number) => x === 0;
    const probability = this.getReliability(this.cards, 0, compareFunc);
    return probability;
  }

  public reliabilityPositive() {
    const compareFunc = (x: number) => x > 0;
    const probability = this.getReliability(this.cards, 0, compareFunc);
    return probability;
  }

  public getEffectsProbability(probHistory = {}) {
    const probabilities = {};
    const sum = this.sum(this.effects);

    for (const key in this.effects) {
      if (this.effects[key] === 0) { continue; }
      const label = key.replace('Rolling ', '').trim();

      if (key.startsWith('Rolling')) {
        const newDeck = new Deck();
        newDeck.effects = _.cloneDeep(this.effects);
        const mult = this.effects[key] / sum;
        newDeck.effects[key] -= 1;

        const effectsStr = JSON.stringify(newDeck.effects);
        if (!probHistory.hasOwnProperty(effectsStr)) {
          probHistory[effectsStr] = newDeck.getEffectsProbability(probHistory);
        }

        probabilities[label] = (probabilities[label] || 0) + mult;
        for (const newLabel in probHistory[effectsStr]) {
          if (newLabel !== label && newLabel !== 'None') {
            probabilities[newLabel] = (probabilities[newLabel] || 0) + mult * probHistory[effectsStr][newLabel];
          }
        }
      } else {
        probabilities[label] = (probabilities[label] || 0) + this.effects[key] / sum;
      }

    }
    return probabilities;
  }

  public getAverageDamage(baseDamage: number): number {
    let damage = 0;
    const sum = this.sum(this.cards);

    for (const key in this.cards) {
      if (this.cards[key] === 0 || ['x0', 'Curse'].includes(key)) { continue; }

      if (key.startsWith('r')) {
        const newDeck = new Deck();
        newDeck.cards = _.cloneDeep(this.cards);
        newDeck.cards[key] -= 1;
        damage += Deck.cardValue[key](newDeck.getAverageDamage(baseDamage)) * (this.cards[key] / sum);
      } else {
        let tmpDamage = Deck.cardValue[key](baseDamage);
        tmpDamage = tmpDamage > 0 ? tmpDamage : 0;
        damage += (tmpDamage) * (this.cards[key] / sum);
      }
    }
    return damage;
  }

  public getShuffleChance(actionNumber: number) {
    const shuffleCards = this.cards.x0 + this.cards.x2;
    const nonRollingCards: number = this.nonRollingSum(this.cards);

    return shuffleCards / (nonRollingCards - (actionNumber - 1));
  }

  public addCard(cardType: string, cardEffect: string, count = 1) {
    this.cards[cardType] += count;
    // this.effects[cardEffect] += count;
    this.addEffect(cardEffect, count);
  }

  public reset() {
    this.cards = _.cloneDeep(DefaultCards);
    this.effects = _.cloneDeep(DefaultEffects);
  }

  public cloneDeck() {
    const newDeck = new Deck();
    newDeck.cards = _.cloneDeep(this.cards);
    newDeck.effects = _.cloneDeep(this.effects);
    return newDeck;
  }

  public addEffect(cardEffect: string, count) {
    if (!(cardEffect in this.effects)) {
      this.effects[cardEffect] = count;
    } else {
      this.effects[cardEffect] += count;
    }
  }
}
