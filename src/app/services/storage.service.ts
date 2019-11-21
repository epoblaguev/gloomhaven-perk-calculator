import { Injectable } from '@angular/core';
import { Character } from '../classes/character';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setPerk(charName: string, perk: string, use: number, applied: boolean) {
    window.localStorage.setItem(`${charName}_${perk}_${use}`, String(applied));
  }

  saveAllPerks(char: Character) {
    this.clearCharacterPerks(char.name);
    char.perkList.forEach(perk => {
      perk.uses.forEach((use, index) => window.localStorage.setItem(`${char.name}_${perk.name}_${index}`, String(use.used)));
    });
  }

  getPerkUsage(charName: string, perk: string): boolean[] {
    return Object.keys(window.localStorage)
      .filter(key => key.startsWith(`${charName}_${perk}`))
      .sort().map(key => window.localStorage[key] === 'true' );
  }

  clearCharacterPerks(charName: string) {
    Object.keys(window.localStorage).forEach(key => {
      if (key.startsWith(charName)) {
        window.localStorage.removeItem(key);
      }
    });
  }
}
