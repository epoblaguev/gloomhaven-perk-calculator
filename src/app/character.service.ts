import { Injectable } from '@angular/core';
import { Character } from './classes/character';
import settings from './settings/settings.json';


@Injectable()
export class CharacterService {

  private characters: Character[];
  private selectedCharacter: number;

  constructor() {
    this.characters = settings.characters.map(char => new Character(char));
    this.selectedCharacter = 0;
  }

  getCharacters() {
    return this.characters;
  }

  getCharacter() {
    return this.characters[this.selectedCharacter];
  }

  selectCharacter(i: number) {
    this.selectedCharacter = i;
  }
}
