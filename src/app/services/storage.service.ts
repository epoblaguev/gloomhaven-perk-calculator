import { Injectable } from '@angular/core';
import { Character } from '../classes/character';
import { DeckModifier } from '../classes/deckModifier';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  readonly compareDeckPrefix = 'CompareDeck';

  constructor() { }

  setDarkMode(value: boolean) {
    window.localStorage.setItem('darkMode', String(value));
  }

  getDarkMode() {
    return window.localStorage.getItem('darkMode') === 'true';
  }

  setSelectedChar(i: number) {
    window.localStorage.setItem('selectedChar', String(i));
  }

  getSelectedChar(): number {
    // Using + to cast string to number, returns 0 if null
    return +window.localStorage.getItem('selectedChar') || 0;
  }

  saveAllMods(char: Character) {
    this.clearCharacterPerks(char.name);
    this.saveModList(char.name, 'perkList', char.perkList);
    this.saveModList(char.name, 'negScenarioEffects', char.negScenarioEffects);
    this.saveModList(char.name, 'negItemEffects', char.negItemEffects);
    this.saveModList(char.name, 'posItemEffects', char.posItemEffects);
    this.saveModList(char.name, 'miscModifiers', char.miscModifiers);
  }

  private saveModList(charName: string, listName: string, modList: DeckModifier[]) {
    modList.forEach(mod => {
      mod.uses.forEach((use, index) => window.localStorage.setItem(`${charName}_${listName}_${mod.name}_${index}`, String(use.used)));
    });
  }

  savePerkIconToggle(state: boolean) {
    window.localStorage.setItem('perkIconToggle', String(state));
  }

  saveComparisonDeck(char: Character) {
    this.clearComparisonDeck(char.name);
    // console.log(`Saving comparison deck for ${char.name}`);
    if (char.compareDeck == null) {
      return;
    }

    window.localStorage.setItem(`${this.compareDeckPrefix}_${char.name}_enabled`, String(true));

    const subdecks = {
      cards: char.compareDeck.cards,
      effects: char.compareDeck.effects
    };

    Object.keys(subdecks).forEach(subdeckKey => {
      Object.keys(subdecks[subdeckKey]).forEach(key => {
        window.localStorage.setItem(`${this.compareDeckPrefix}_${char.name}_${subdeckKey}_${key}`, String(subdecks[subdeckKey][key]));
      });
    });
  }

  loadComparisonDeck(char: Character) {
    // console.log(`Loading comparison deck for ${char.name}`);
    if (window.localStorage.getItem(`${this.compareDeckPrefix}_${char.name}_enabled`) !== String(true)) {
      return;
    }

    if (char.compareDeck == null) {
      char.compareDeck = char.deck.cloneDeck();
    }

    const subdecks = {
      cards: char.compareDeck.cards,
      effects: char.compareDeck.effects
    };

    Object.keys(subdecks).forEach(subdeckKey => {
      Object.keys(subdecks[subdeckKey]).forEach(key => {
        const savedValue = window.localStorage[`${this.compareDeckPrefix}_${char.name}_${subdeckKey}_${key}`];
        if (savedValue != null) { subdecks[subdeckKey][key] = Number(savedValue); }
      });
    });
  }

  clearComparisonDeck(charName: string) {
    // console.log(`Clearing comparison deck for ${charName}`);
    Object.keys(window.localStorage).forEach(key => {
      if (key.startsWith(`${this.compareDeckPrefix}_${charName}`)) {
        window.localStorage.removeItem(key);
      }
    });

    window.localStorage.setItem(`${this.compareDeckPrefix}_${charName}_enabled`, String(false));
  }

  loadPerkIconToggle(): boolean {
    return (window.localStorage['perkIconToggle'] || 'true') === 'true';
  }

  loadAllMods(char: Character) {
    this.loadModList(char.name, 'perkList', char.perkList);
    this.loadModList(char.name, 'negScenarioEffects', char.negScenarioEffects);
    this.loadModList(char.name, 'negItemEffects', char.negItemEffects);
    this.loadModList(char.name, 'posItemEffects', char.posItemEffects);
    this.loadModList(char.name, 'miscModifiers', char.miscModifiers);
  }

  private loadModList(charName: string, listName: string, modList: DeckModifier[]) {
    modList.forEach(mod => {
      const storedUses = this.loadModUsage(charName, listName, mod.name);
      mod.uses.forEach((use, index) => {
        if (index < storedUses.length) { use.used = storedUses[index]; }
      });
    });
  }

  private loadModUsage(charName: string, modListName: string, perk: string): boolean[] {
    return Object.keys(window.localStorage)
      .filter(key => key.startsWith(`${charName}_${modListName}_${perk}`))
      .sort().map(key => window.localStorage[key] === 'true');
  }

  clearCharacterPerks(charName: string) {
    Object.keys(window.localStorage).forEach(key => {
      if (key.startsWith(charName)) {
        window.localStorage.removeItem(key);
      }
    });
  }
}
