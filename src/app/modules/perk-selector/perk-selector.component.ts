import { Component, OnInit, AfterViewInit, AfterContentInit, Sanitizer, Pipe, PipeTransform, Input, OnDestroy } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { StorageService } from 'src/app/services/storage.service';
import { PerkIconsComponent } from 'src/app/modules/perk-icons/perk-icons.component';
import { FaIcons } from 'src/app/classes/consts';
import { GameService } from 'src/app/services/game.service';
import { GameVersion } from 'src/app/classes/gameVersion';
import { KeyValue } from '@angular/common';
import { Character } from 'src/app/classes/character';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-perk-selector',
  templateUrl: './perk-selector.component.html',
  styleUrls: ['./perk-selector.component.scss']
})
export class PerkSelectorComponent implements OnInit, OnDestroy {
  public character: Character;
  public characters: Character[];

  public iconWords = PerkIconsComponent.supportedWords;
  public showIcons = true;
  public selectedCharacter = 0;
  public faIcons = FaIcons;
  public hideRealNames = true;
  public getKeys = Object.keys;

  private subscriptions = new Subscription();

  constructor(private charService: CharacterService, public gameService: GameService,
              private storageService: StorageService) {
    this.showIcons = storageService.loadPerkIconToggle();

    this.subscriptions.add(charService.getCharactersObservable().subscribe(characters => this.characters = characters));
    this.subscriptions.add(charService.getCharacterObservable().subscribe(character => this.character = character));
  }

  ngOnInit(): void {
    this.selectedCharacter = this.characters.indexOf(this.character);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Returns 'true' if passed gameName is the only gameName with the 'true' value
   * @param gameName name of game to disable
   */
  disableGameNameCheckbox(gameName: string) {
    let numChecked = 0;
    this.gameService.games.forEach(val => numChecked += val.enabled ? 1 : 0);
    return this.gameService.games.get(gameName).enabled && numChecked === 1;
  }

  /**
   * Toggles selected game name. If this is the game name of the currently selected character,
   * selects the first character with a non-false game name.
   * @param gameName name of game to toggle
   */
  toggleGameVersion(gameVersion: GameVersion) {
    gameVersion.enabled = !gameVersion.enabled;
    if (!gameVersion.enabled && this.character.gameName === gameVersion.name) {
      let charIdx = 0;
      for (const char of this.characters) {
        // console.log(this.gameService.games);
        // console.log(char.gameName);
        if (this.gameService.games.get(char.gameName).enabled) {
          this.selectedCharacter = charIdx;
          this.selectedCharacterChanged();
          return;
        }
        charIdx += 1;
      }
    }
  }

  gameVersionOrder(a: KeyValue<string, GameVersion>, b: KeyValue<string, GameVersion>) {
    return a.value.priority < b.value.priority;
  }

  getPerkCount() {
    return this.character
      .perkList.map(perk => perk.uses.filter(val => val.used).length)
      .reduce((a, b) => a + b);
  }

  selectedCharacterChanged() {
    this.charService.selectCharacter(this.selectedCharacter);
    this.storageService.setSelectedChar(this.selectedCharacter);
  }

  perkChanged() {
    this.character.applyModifiers();
    this.storageService.saveAllMods(this.character);
  }

  reset() {
    this.resetPerkCheckboxes();
    this.resetDeck();
    this.resetDeckModifiers();
    this.storageService.clearCharacterPerks(this.character.name);
  }

  togglePerkIcons() {
    this.showIcons = !this.showIcons;
    this.storageService.savePerkIconToggle(this.showIcons);
  }

  toggleComparison() {
    const character = this.character;
    if (character.compareDeck == null) {
      character.compareDeck = character.deck.cloneDeck();
      this.storageService.saveComparisonDeck(character);
    } else {
      character.compareDeck = null;
      this.storageService.clearComparisonDeck(character.name);
    }
  }

  private resetPerkCheckboxes() {
    this.character.perkList.forEach(perk => perk.uses.forEach(use => use.used = false));
  }

  private resetDeck() {
    this.character.deck.reset();
  }

  private resetDeckModifiers() {
    const char = this.character;
    const modifiers = [char.negItemEffects, char.posItemEffects, char.negScenarioEffects, char.posScenarioEffects];
    modifiers.forEach(modList => modList.forEach(mod => mod.uses.forEach(use => use.used = false)));
  }
}
