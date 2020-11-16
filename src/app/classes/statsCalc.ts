import * as Utils from './utils';



const cardValue = {
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

function sum(cards: Record<string, number> ): number {
  let result = 0;
  for (const key in cards) {
    if (cards.hasOwnProperty(key)) {
      result += cards[key];
    }
  }
  return result;
}

function nonRollingSum(cards: Record<string, number> ): number {
  let result = 0;
  for (const key in cards) {
    if (cards.hasOwnProperty(key)) {
      result += key.startsWith('r+') || key.startsWith('Rolling') ? 0 : cards[key];
    }
  }
  return result;
}

export function getCardsProbability(cards: Record<string, number> ): Record<string, number> {
  const nrs = nonRollingSum(cards);
  const probabilities = {};

  for (const [key, value] of Object.entries(cards)) {
    const rollingSum = key.startsWith('r+') || key.startsWith('Rolling') ? nrs + value : nrs;
    probabilities[key] = value / rollingSum;
  }

  return probabilities;
}

function getReliability(cards: Record<string, number> , rollingValue = 0, compareFunc: (x: number) => boolean) {
  // The base damage from which to start calculating.
  // If ending value is less, reliability is negative, if same, neutral, and if more positive.
  const baseValue = 10;

  let probability = 0;

  for (const cardType in cards) {
    // Ignore cards not in deck
    if (cards[cardType] === 0) {
      continue;
    }

    if (!cardType.startsWith('r') && compareFunc(cardValue[cardType](baseValue + rollingValue) - baseValue)) {
      probability += cards[cardType] / sum(cards);
    } else if (cardType.startsWith('r')) {
      const newCards = Utils.clone(cards);
      newCards[cardType] -= 1;

      probability += (cards[cardType] / sum(cards))
        * getReliability(newCards, cardValue[cardType](baseValue + rollingValue) - baseValue, compareFunc);
    }
  }

  return probability;
}

export function reliabilityNegative(cards: Record<string, number> ) {
  const compareFunc = (x: number) => x < 0;
  const probability = getReliability(cards, 0, compareFunc);
  return probability;
}

export function reliabilityZero(cards: Record<string, number> ) {
  const compareFunc = (x: number) => x === 0;
  const probability = getReliability(cards, 0, compareFunc);
  return probability;
}

export function reliabilityPositive(cards: Record<string, number> ) {
  const compareFunc = (x: number) => x > 0;
  const probability = getReliability(cards, 0, compareFunc);
  return probability;
}

export function getEffectsProbability(effects: Record<string, number> , probHistory = {}) {
  const probabilities = {};
  const effectSum = sum(effects);

  for (const key in effects) {
    if (effects[key] === 0) { continue; }
    const label = key.replace('Rolling ', '').trim();

    if (key.startsWith('Rolling')) {
      const newEffects = Utils.clone(effects);
      const mult = effects[key] / effectSum;
      newEffects[key] -= 1;

      const effectsStr = JSON.stringify(newEffects);
      if (!probHistory.hasOwnProperty(effectsStr)) {
        probHistory[effectsStr] = getEffectsProbability(newEffects, probHistory);
      }

      probabilities[label] = (probabilities[label] || 0) + mult;
      for (const newLabel in probHistory[effectsStr]) {
        if (newLabel !== label && newLabel !== 'None') {
          probabilities[newLabel] = (probabilities[newLabel] || 0) + mult * probHistory[effectsStr][newLabel];
        }
      }
    } else {
      probabilities[label] = (probabilities[label] || 0) + effects[key] / effectSum;
    }

  }
  return probabilities;
}

export function getAverageDamage(cards: Record<string, number> , baseDamage: number): number {
  let damage = 0;
  const cardsSum = sum(cards);

  for (const key in cards) {
    if (cards[key] === 0 || ['x0', 'Curse'].includes(key)) { continue; }

    if (key.startsWith('r')) {
      const newCards = Utils.clone(cards);
      newCards[key] -= 1;
      damage += cardValue[key](getAverageDamage(newCards, baseDamage)) * (cards[key] / cardsSum);
    } else {
      let tmpDamage = cardValue[key](baseDamage);
      tmpDamage = tmpDamage > 0 ? tmpDamage : 0;
      damage += (tmpDamage) * (cards[key] / cardsSum);
    }
  }
  return damage;
}

export function getShuffleChance(cards: Record<string, number> , actionNumber: number) {
  const shuffleCards = cards.x0 + cards.x2;
  const nonRollingCards: number = nonRollingSum(cards);

  return shuffleCards / (nonRollingCards - (actionNumber - 1));
}
