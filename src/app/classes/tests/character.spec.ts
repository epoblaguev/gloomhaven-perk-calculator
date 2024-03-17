import { Character } from '../character';
import charJson from '../../../assets/settings/characters.json';
import { PERK_LIST } from '../deckModifier';


describe('Character', () => {
  // Test that all characters can be initialized
  charJson.characters.forEach(character => {
    it(`should create an instance of character ${character.name}`, () => {
      expect(new Character(character)).toBeTruthy();
    });
  });

  // Test that all characters have exactly 15 perks
  charJson.characters.forEach(character => {
    const expected = ['Boneshaper', 'Geminate', 'Banner Spear'].includes(character.name) ? 14 : 15;
    it(`${character.name} should have ${expected} perks`, () => {
      const char = new Character(character);
      expect(char.perkList.map(perk => perk.uses.length).reduce((prev, cur) => prev + cur)).toBe(expected, `${char.name} failed`);
    });
  });

  // Test that all characters have havlid perks
  charJson.characters.forEach(character => {
    character.perks.forEach(perk => {
      it(`${character.name} perk "${perk.name}" should be valid`, () => {
        expect(Object.keys(PERK_LIST)).toContain(perk.name, `"${perk.name}" is not a valid perk`);
      });
    });

    it(`${character.name} Modifiers should have effect on character`, () => {
      const char = new Character(character);
      const baseChar = new Character(character);
      const modLists = [char.perkList, char.negScenarioEffects, char.negItemEffects, char.posItemEffects, char.posScenarioEffects];
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
});
