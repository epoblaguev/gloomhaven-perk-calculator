import * as Utils from './utils';

export const DefaultCards: Record<string, number> = {
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

export const DefaultEffects: Record<string, number>  = {
  None: 20,
};

export class Deck {
  public effects: Record<string, number> ;
  public cards: Record<string, number> ;

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
    return Utils.clone(this);
  }

  public addEffect(cardEffect: string, count) {
    if (!(cardEffect in this.effects)) {
      this.effects[cardEffect] = count;
    } else {
      this.effects[cardEffect] += count;
    }
  }
}
