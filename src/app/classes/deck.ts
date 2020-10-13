import * as Utils from './utils';

export const DefaultCards = {
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

export const DefaultEffects = {
  None: 20,
};

export class Deck {
  public effects: typeof DefaultEffects;
  public cards: typeof DefaultCards;

  constructor() {
    this.cards = Utils.clone(DefaultCards);
    this.effects = Utils.clone(DefaultEffects);
  }

  public addCard(cardType: string, cardEffect: string, count = 1) {
    this.cards[cardType] += count;
    // this.effects[cardEffect] += count;
    this.addEffect(cardEffect, count);
  }

  public reset() {
    this.cards = Utils.clone(DefaultCards);
    this.effects = Utils.clone(DefaultEffects);
  }

  public cloneDeck() {
    const newDeck = new Deck();
    newDeck.cards = Utils.clone(this.cards);
    newDeck.effects = Utils.clone(this.effects);
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
