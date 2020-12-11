import { Injectable } from '@angular/core';
import { Character } from '../classes/character';
import charactersJson from '../../assets/settings/characters.json';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable()
export class CharacterService {
  private characters: Character[];
  private selectedCharacter: number;

  private characterSubject: BehaviorSubject<Character>;
  public character$: Observable<Character>;

  private charactersSubject: BehaviorSubject<Character[]>;
  public characters$: Observable<Character[]>;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.characters = charactersJson.characters.map(char => new Character(char));
    this.characters.sort(this.charSort);
    this.selectedCharacter = 0;

    this.charactersSubject = new BehaviorSubject<Character[]>(this.characters);
    this.characters$ = this.charactersSubject.asObservable();

    this.characterSubject = new BehaviorSubject<Character>(this.getCharacter());
    this.character$ = this.characterSubject.asObservable();

    //Add icon to registry
    this.characters.forEach(char => {
      this.iconRegistry.addSvgIcon(char.icon, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/charIcons/${char.icon}`));
    });
  }

  getCharacters() {
    return this.characters;
  }

  private getCharacter() {
    return this.characters[this.selectedCharacter];
  }

  selectCharacter(i: number) {
    this.selectedCharacter = i;
    this.characterSubject.next(this.getCharacter());
  }

  private charSort(char1: Character, char2: Character): number {
    const char1Name = `${char1.name === char1.hiddenName ? 1 : 2}_${char1.gameName}_${char1.hiddenName}`;
    const char2Name = `${char2.name === char2.hiddenName ? 1 : 2}_${char2.gameName}_${char2.hiddenName}`;

    if (char1Name < char2Name) {
      return -1;
    } else if (char1Name > char2Name) {
      return 1;
    } else {
      return 0;
    }
  }
}
