import { Injectable } from '@angular/core';
import { Character } from '../classes/character';
import { DeckModifier } from '../classes/deckModifier';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setPerk(charName: string, perk: string, use: number, applied: boolean) {
    window.localStorage.setItem(`${charName}_${perk}_${use}`, String(applied));
  }

  saveAllMods(char: Character) {
    this.clearCharacterPerks(char.name);
    this.saveModList(char.name, 'perkList', char.perkList);
    this.saveModList(char.name, 'negScenarioEffects', char.negScenarioEffects);
    this.saveModList(char.name, 'negItemEffects', char.negItemEffects);
    this.saveModList(char.name, 'miscModifiers', char.miscModifiers);

    // char.perkList.forEach(perk => {
    //   perk.uses.forEach((use, index) => window.localStorage.setItem(`${char.name}_${perk.name}_${index}`, String(use.used)));
    // });
  }

  private saveModList(charName: string, listName: string, modList: DeckModifier[]) {
    modList.forEach(mod => {
      mod.uses.forEach((use, index) => window.localStorage.setItem(`${charName}_${listName}_${mod.name}_${index}`, String(use.used)));
    });
  }

  loadAllMods(char: Character) {
    this.loadModList(char.name, 'perkList', char.perkList);
    this.loadModList(char.name, 'negScenarioEffects', char.negScenarioEffects);
    this.loadModList(char.name, 'negItemEffects', char.negItemEffects);
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
