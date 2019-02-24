import { Character } from './character';
import settings from '../settings/settings.json';
import { Deck } from './deck';
import Utils from './utils';


describe('Character', () => {
  it('should create an instance', () => {
    Object.values(settings.characters).forEach(character => {
      expect(new Character(character)).toBeTruthy();
    });
  });

  it('each class should have 15 perks', () => {
    Object.values(settings.characters).forEach(character => {
      const char = new Character(character);
      expect(char.perkList.map(perk => perk.uses).reduce((prev, cur) => prev + cur)).toBe(15, `${char.name} failed`);
    });
  });

  it('perks should be reversable', () => {
    const deck = new Deck();
    Object.values(settings.characters).forEach(character => {
      const char = new Character(character);
      Object.values(char.perkList).forEach(perk => {
        const originalDeck: Deck = Utils.clone(deck);
        perk.set(deck);
        perk.unset(deck);
        expect(Utils.equals(deck.cards, originalDeck.cards)).toBeTruthy(`"${perk.name}" cards aren't reversable`);
        expect(Utils.equals(deck.effects, originalDeck.effects)).toBeTruthy(`"${perk.name}" effects aren't reversable`);
      });
    });
  });
});
