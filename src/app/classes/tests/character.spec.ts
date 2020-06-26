import { Character } from '../character';
import settings from '../../../assets/settings/settings.json';
import { PERK_LIST } from '../deckModifier';


describe('Character', () => {
  // Test that all characters can be initialized
  settings.characters.forEach(character => {
    it(`should create an instance of character ${character.name}`, () => {
      expect(new Character(character)).toBeTruthy();
    });
  });

  // Test that all characters have exactly 15 perks
  settings.characters.forEach(character => {
    it(`${character.name} should have 15 perks`, () => {
      const char = new Character(character);
      expect(char.perkList.map(perk => perk.uses.length).reduce((prev, cur) => prev + cur)).toBe(15, `${char.name} failed`);
    });
  });

  // Test that all characters have havlid perks
  settings.characters.forEach(character => {
    it(`${character.name} should have valid perks`, () => {
      character.perks.forEach(perk => {
        expect(Object.keys(PERK_LIST)).toContain(perk.name, `"${perk.name}" is not a valid perk`);
      });
    });

    it(`${character.name} Modifiers should have effect on character`, () => {
      const char = new Character(character);
      const baseChar = new Character(character);
      const modLists = [char.perkList, char.negScenarioEffects, char.negItemEffects, char.posItemEffects, char.miscModifiers];
      modLists.forEach(modList => modList.forEach(mod => {
        mod.uses.forEach((use, idx) => {
          use.used = true;
          char.applyModifiers();
          use.used = false; // Reverting to false to make sure this isn't the cause of the change.
          expect(char).not.toEqual(baseChar, `"${mod.name}" use ${idx + 1} has no effect on deck`);
        });
      }));
  });
});


  /*
  // Test that all perks are reversable
  Object.values(settings.characters).forEach(character => {
    const char = new Character(character);
    Object.values(char.perkList).forEach(perk => {
      it(`${char.name} perk '${perk.name}' should be reversable`, () => {
        const deck = new Deck();
        const originalDeck: Deck = Utils.clone(deck);
        perk.set(deck);
        // perk.unset(deck);
        expect(deck.cards).toEqual(originalDeck.cards, `"${perk.name}" cards aren't reversable`);
        expect(deck.effects).toEqual(originalDeck.effects, `"${perk.name}" effects aren't reversable`);
      });
    });
  });
  */
});
