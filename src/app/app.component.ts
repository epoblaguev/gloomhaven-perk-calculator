import { Component } from '@angular/core';
import { DeckReliabilityComponent } from './deck-reliability/deck-reliability.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  standardDeck = new Deck();
  deck = new Deck();

  // Table data
  mainTableDataSource = this.deck.getCardTypes();
  displayedColumns: string[] = ['card', 'count', 'percent', 'percent-bar'];

  characters: Array<Character> = [
    new Cragheart(),
    new Scoundrel(),
    new Brute(),
    new Spellweaver()
  ];
  selectedCharacter = 0;

  characterChanged() {
    this.deck = new Deck();
  }

  selectPerk(event, set: (deck: Deck) => void, unset: (deck: Deck) => void) {
    if (event.checked) {
      set(this.deck);
    } else {
      unset(this.deck);
    }
  }
}

export class Deck {
  cards = {
    x0: 1,
    '-2': 1,
    '-1': 5,
    '+0': 6,
    '+1': 5,
    '+2': 1,
    '+3': 0,
    x2: 1
  };

  getCardTypes() {
    return Object.keys(this.cards);
  }

  sum(): number {
    return Object.values(this.cards).reduce((prev, cur) => prev + cur);
  }

  cardChance(cardType: string): number {
    return Math.round((this.cards[cardType] / this.sum()) * 100);
  }

  reliabilityNegative() {
    return Math.round((this.cards.x0 + this.cards['-2'] + this.cards['-1']) * 100 / this.sum());
  }

  reliabilityZero() {
    return Math.round((this.cards['+0'] * 100 / this.sum()));
  }

  reliabilityPositive() {
    return Math.round((this.cards.x2 + this.cards['+3'] + this.cards['+2'] + this.cards['+1']) * 100 / this.sum());
  }

  addCard(cardType: string) {
    this.cards[cardType]++;
  }

  removeCard(cardType: string) {
    if (this.cards[cardType] > 0) { this.cards[cardType]--; }
  }
}

class Character {
  name: string;
  hiddenName = '????';
  perkList: Array<Perk>;
}

class Cragheart extends Character {
  name = 'Cragheart';
  perkList = [
    new Perk('Remove four (+0) cards', 1,
      (deck: Deck) => { deck.cards['+0'] -= 4; },
      (deck: Deck) => { deck.cards['+0'] += 4; }),
    new Perk('Replace one (-1) card with one (+1) card', 3,
      (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }),
    new Perk('Add one (-2) card and two (+2) cards', 1,
      (deck: Deck) => { deck.cards['-2'] += 1; deck.cards['+2'] += 2; },
      (deck: Deck) => { deck.cards['-2'] -= 1; deck.cards['+2'] -= 2; }),
    new Perk('Add one (+1) IMMOBILIZE card', 2,
      (deck: Deck) => { deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['+1'] -= 1; }),
    new Perk('Add one (+2) MUDDLE card', 2,
      (deck: Deck) => { deck.cards['+2'] += 1; },
      (deck: Deck) => { deck.cards['+2'] -= 1; })
  ];
}

class Scoundrel extends Character {
  name = 'Scoundrel';
  perkList = [
    new Perk('Remove two (-1) cards', 2,
      (deck: Deck) => { deck.cards['-1'] -= 2; },
      (deck: Deck) => { deck.cards['-1'] += 2; }),
    new Perk('Remove four (+0) cards', 1,
      (deck: Deck) => { deck.cards['+0'] -= 4; },
      (deck: Deck) => { deck.cards['+0'] += 4; }),
    new Perk('Replace one (-2) with one (+0) card', 1,
      (deck: Deck) => { deck.cards['-2'] -= 1; deck.cards['+0'] += 1; },
      (deck: Deck) => { deck.cards['-2'] += 1; deck.cards['+0'] -= 1; }),
    new Perk('Replace one (-1) card with one (+1) card', 1,
      (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }),
    new Perk('Replace one (+0) card with one (+2) card', 2,
      (deck: Deck) => { deck.cards['+0'] -= 1; deck.cards['+2'] += 1; },
      (deck: Deck) => { deck.cards['+0'] += 1; deck.cards['+2'] -= 1; })
  ];
}

class Brute extends Character {
  name = 'Brute';
  perkList = [
    new Perk('Remove two (-1) cards', 1,
      (deck: Deck) => { deck.cards['-1'] -= 2; },
      (deck: Deck) => { deck.cards['-1'] += 2; }),
    new Perk('Replace one (-1) card with one (+1) card', 1,
      (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }),
    new Perk('Add two (+1) cards', 2,
      (deck: Deck) => { deck.cards['+1'] += 2; },
      (deck: Deck) => { deck.cards['+1'] -= 2; }),
    new Perk('Add one (+3) card', 1,
      (deck: Deck) => { deck.cards['+3'] += 1; },
      (deck: Deck) => { deck.cards['+3'] -= 1; }),
    new Perk('Ignore negative item effects and add one (+1) card', 1,
      (deck: Deck) => { deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['+1'] -= 1; })
  ];
}

class Spellweaver extends Character {
  name = 'Spellweaver';
  perkList = [
    new Perk('Remove four (+0) cards', 1,
      (deck: Deck) => { deck.cards['+0'] -= 4; },
      (deck: Deck) => { deck.cards['+0'] += 4; }),
    new Perk('Replace one (-1) card with one (+1) card', 2,
      (deck: Deck) => { deck.cards['-1'] -= 1; deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['-1'] += 1; deck.cards['+1'] -= 1; }),
    new Perk('Add two (+1) cards', 2,
      (deck: Deck) => { deck.cards['+1'] += 2; },
      (deck: Deck) => { deck.cards['+1'] -= 2; }),
    new Perk('Add one (+0) STUN card', 1,
      (deck: Deck) => { deck.cards['+0'] += 1; },
      (deck: Deck) => { deck.cards['+0'] -= 1; }),
    new Perk('Add one (+1) WOUND card', 1,
      (deck: Deck) => { deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['+1'] -= 1; }),
    new Perk('Add one (+1) IMMOBILIZE card', 1,
      (deck: Deck) => { deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['+1'] -= 1; }),
    new Perk('Add one (+1) CURSE card', 1,
      (deck: Deck) => { deck.cards['+1'] += 1; },
      (deck: Deck) => { deck.cards['+1'] -= 1; }),
    new Perk('Add one (+2) FIRE card', 2,
      (deck: Deck) => { deck.cards['+2'] += 1; },
      (deck: Deck) => { deck.cards['+2'] -= 1; }),
    new Perk('Add one (+2) FROST card', 2,
      (deck: Deck) => { deck.cards['+2'] += 1; },
      (deck: Deck) => { deck.cards['+2'] -= 1; }),
  ];
}

class Perk {
  name: string;
  uses: number;
  set: (deck: Deck) => void;
  unset: (deck: Deck) => void;

  constructor(name: string, uses: number, set: (deck: Deck) => void, unset: (deck: Deck) => void) {
    this.name = name;
    this.uses = uses;
    this.set = set;
    this.unset = unset;
  }
}
